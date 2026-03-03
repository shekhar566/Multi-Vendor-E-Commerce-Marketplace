import { TRPCError } from "@trpc/server";
import { headers as getHeaders } from "next/headers";
import type { Sort, Where } from "payload";
import z from "zod";

import { DEFAULT_LIMIT } from "@/constants";
import { sortValues } from "@/modules/products/search-params";
import { Category, Media, Tenant } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const productsRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const headers = await getHeaders();
      const session = await ctx.db.auth({ headers });

      const product = await ctx.db.findByID({
        collection: "products",
        id: input.id,
        depth: 2,
        select: {
          content: false,
        },
      });

      if (product.isArchived) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invoice not found",
        });
      }

      let isPurchased = false;

      const productTenantId =
        typeof product.tenant === "string"
          ? product.tenant
          : product.tenant?.id;

      if (session.user) {
        const ordersData = await ctx.db.find({
          collection: "orders",
          pagination: false,
          limit: 1,
          where: {
            and: [
              {
                product: {
                  equals: input.id,
                },
              },
              {
                user: {
                  equals: session.user.id,
                },
              },
            ],
          },
        });
        isPurchased = !!ordersData.docs[0];
      }

      const isTenantMember = Boolean(
        productTenantId &&
        session.user?.tenants?.some((membership) => {
          const tenantId =
            typeof membership.tenant === "string"
              ? membership.tenant
              : membership.tenant?.id;
          return tenantId === productTenantId;
        })
      );

      if (product.isPrivate && !isPurchased && !isTenantMember) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Invoice not found",
        });
      }

      return {
        ...product,
        isPurchased,
        image: product.image as Media | null,
        tenant: product.tenant as Tenant & { image: Media | null },
      };
    }),
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT),
        search: z.string().nullable().optional(),
        category: z.string().nullable().optional(),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        tags: z.array(z.string()).nullable().optional(),
        sort: z.enum(sortValues).nullable().optional(),
        tenantSlug: z.string().nullable().optional(),
        paymentStatus: z.string().nullable().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where: Where = {
        isArchived: {
          not_equals: true,
        },
      };
      let sort: Sort = "-createdAt";

      if (input.sort === "curated" || input.sort === "trending")
        sort = "-createdAt";
      if (input.sort === "hot_and_new") sort = "+createdAt";

      if (input.minPrice && input.maxPrice) {
        where.price = {
          greater_than_equal: input.minPrice,
          less_than_equal: input.maxPrice,
        };
      } else if (input.minPrice) {
        where.price = { greater_than_equal: input.minPrice };
      } else if (input.maxPrice) {
        where.price = { less_than_equal: input.maxPrice };
      }

      // 🛡️ CODERABBIT IDOR PATCH #2: Secure Tenant-Level Discovery
      if (input.tenantSlug) {
        // Step 1: Filter by the requested tenant
        where["tenant.slug"] = { equals: input.tenantSlug };

        // Step 2: Check who is actually asking for this data
        const headers = await getHeaders();
        const session = await ctx.db.auth({ headers });
        let isTenantMember = false;

        if (session?.user) {
          // Look up the actual Tenant ID using the slug so we can compare it
          const tenantData = await ctx.db.find({
            collection: "tenants",
            where: { slug: { equals: input.tenantSlug } },
            limit: 1,
          });

          const targetTenant = tenantData.docs[0];

          if (targetTenant) {
            // Check if this specific user has this specific tenant in their membership list
            isTenantMember = Boolean(
              session.user.tenants?.some((membership) => {
                const membershipId =
                  typeof membership.tenant === "string"
                    ? membership.tenant
                    : membership.tenant?.id;
                return membershipId === targetTenant.id;
              })
            );
          }
        }

        // Step 3: THE LOCKDOWN
        // If they are NOT a member of this company, force the database to hide all private invoices.
        // They will only see public data, keeping the private retainers 100% secure.
        if (!isTenantMember) {
          where["isPrivate"] = { not_equals: true };
        }
      } else {
        // If they didn't ask for a specific tenant, they are just browsing the public homepage.
        // Never show private invoices here!
        where["isPrivate"] = { not_equals: true };
      }

      // 🛡️ CODERABBIT FIX #2: SECURE THE FINANCIAL FILTER
      if (input.paymentStatus) {
        const headers = await getHeaders();
        const session = await ctx.db.auth({ headers });

        if (!session?.user) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You must be authenticated to filter financial statuses.",
          });
        }

        where["paymentStatus"] = { equals: input.paymentStatus };
      }

      if (input.category) {
        const categoriesData = await ctx.db.find({
          collection: "categories",
          limit: 1,
          depth: 1,
          pagination: false,
          where: {
            slug: {
              equals: input.category,
            },
          },
        });

        const formattedData = categoriesData.docs.map((doc) => ({
          ...doc,
          subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
            ...(doc as Category),
            subcategories: undefined,
          })),
        }));

        const subcategoriesSlugs = [];
        const parentCategory = formattedData[0];

        if (parentCategory) {
          subcategoriesSlugs.push(
            ...parentCategory.subcategories.map(
              (subcategory) => subcategory.slug
            )
          );
          where["category.slug"] = {
            in: [parentCategory.slug, ...subcategoriesSlugs],
          };
        }
      }

      if (input.tags && input.tags.length > 0) {
        where["tags.name"] = { in: input.tags };
      }

      if (input.search) {
        where["name"] = { like: input.search };
      }

      const data = await ctx.db.find({
        collection: "products",
        depth: 2,
        where,
        sort,
        page: input.cursor,
        limit: input.limit,
        select: {
          content: false,
        },
      });

      return {
        ...data,
        docs: data.docs.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & { image: Media | null },
        })),
      };
    }),
});
