import { isSuperAdmin } from "@/lib/access";
import { Tenant } from "@/payload-types";
import { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products", // Kept intact to protect your tRPC routers from breaking
  labels: {
    singular: "Deliverable & Invoice",
    plural: "Deliverables & Invoices",
  },
  access: {
    create: ({ req, id }) => {
      if (isSuperAdmin(req.user)) return true;
      const tenant = req.user?.tenants?.[0]?.tenant as Tenant;
      return Boolean(tenant?.stripeDetailsSubmitted);
    },
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  admin: {
    useAsTitle: "name",
    description:
      "Create invoices and attach final secure deliverables for your clients.",
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Invoice / Project Title",
      required: true,
      admin: {
        description: 'e.g., "Q1 Website Redesign" or "March SEO Retainer"',
      },
    },
    {
      name: "description",
      label: "Scope of Work",
      type: "richText",
    },
    {
      name: "price",
      type: "number",
      label: "Invoice Amount",
      required: true,
      admin: {
        description: "Amount in USD",
      },
    },
    // --- NEW B2B AGENCY FIELDS START ---
    {
      name: "dueDate",
      type: "date",
      label: "Invoice Due Date",
    },
    {
      name: "paymentStatus",
      type: "select",
      label: "Status",
      options: ["Draft", "Pending", "Paid", "Overdue"],
      defaultValue: "Pending",
    },
    // --- NEW B2B AGENCY FIELDS END ---
    {
      name: "category",
      label: "Service Category",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
    },
    {
      name: "image",
      label: "Preview Thumbnail",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "content",
      label: "Final Deliverables (Locked)",
      type: "richText",
      admin: {
        description:
          "Protected content. Add secure Figma links, downloadable ZIP files, or final assets here. The client can ONLY access this AFTER paying the invoice.",
      },
    },
    {
      name: "isPrivate",
      label: "Draft Mode",
      defaultValue: false,
      type: "checkbox",
      admin: {
        description:
          "If checked, the client will not see this invoice in their portal yet.",
      },
    },
    {
      name: "isArchived",
      label: "Archive",
      defaultValue: false,
      type: "checkbox",
      admin: {
        description:
          "If checked, this invoice will be hidden from the active dashboard.",
      },
    },
  ],
  timestamps: true,
};
