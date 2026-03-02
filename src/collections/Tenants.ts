// import { isSuperAdmin } from "@/lib/access";
// import type { CollectionConfig } from "payload";

// export const Tenants: CollectionConfig = {
//   slug: "tenants",
//   access: {
//     create: ({ req }) => isSuperAdmin(req.user),
//     delete: ({ req }) => isSuperAdmin(req.user),
//   },
//   admin: {
//     useAsTitle: "slug",
//   },
//   fields: [
//     {
//       name: "name",
//       required: true,
//       type: "text",
//       label: "Store Name",
//       admin: {
//         description: "This is the name of the store (e.g. Next's Store )",
//       },
//     },
//     {
//       name: "slug",
//       type: "text",
//       index: true,
//       required: true,
//       unique: true,
//       access: {
//         update: ({ req }) => isSuperAdmin(req.user),
//       },
//       admin: {
//         description:
//           "This is the subdomain for the store (e.g. [slug].funroad.com )",
//       },
//     },
//     {
//       name: "image",
//       type: "upload",
//       relationTo: "media",
//       required: false,
//     },
//     {
//       name: "stripeAccountId",
//       type: "text",
//       required: true,
//       access: {
//         update: ({ req }) => isSuperAdmin(req.user),
//       },
//       admin: {
//         description: "Stripe Account ID associated with your shop",
//       },
//     },
//     {
//       name: "stripeDetailsSubmitted",
//       type: "checkbox",
//       access: {
//         update: ({ req }) => isSuperAdmin(req.user),
//       },
//       admin: {
//         readOnly: true,
//         description:
//           "You cannot create products until you submit your Stripe details",
//       },
//     },
//   ],
// };

import { isSuperAdmin } from "@/lib/access";
import type { CollectionConfig } from "payload";

export const Tenants: CollectionConfig = {
  slug: "tenants",
  access: {
    create: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  admin: {
    useAsTitle: "name", // Changed this to 'name' so your dashboard shows "Apex Law" instead of "apex-law"
  },
  fields: [
    {
      name: "name",
      required: true,
      type: "text",
      label: "Client Company Name",
      admin: {
        description:
          "This is the name of the client's company (e.g. Apex Law )",
      },
    },
    {
      name: "slug",
      type: "text",
      index: true,
      required: true,
      unique: true,
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
      admin: {
        description:
          "This is the secure URL slug for the client portal (e.g. [slug].youragency.com )",
      },
    },

    {
      name: "contactName",
      type: "text",
      label: "Primary Contact Name",
      admin: {
        description:
          "The main decision maker or point of contact (e.g., Sarah the CMO).",
      },
    },
    {
      name: "contactEmail",
      type: "email",
      label: "Billing / Contact Email",
      admin: {
        description: "Where the invoices and notifications will be sent.",
      },
    },
    {
      name: "industry",
      type: "text",
      label: "Client Industry",
      admin: {
        description: "e.g., Healthcare, SaaS, E-commerce, Real Estate",
      },
    },

    {
      name: "image",
      type: "upload",
      label: "Client Logo",
      relationTo: "media",
      required: false,
    },
    {
      name: "stripeAccountId",
      type: "text",
      required: true,
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
      admin: {
        description:
          "Stripe Account ID for processing payments for this client",
      },
    },
    {
      name: "stripeDetailsSubmitted",
      type: "checkbox",
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
      },
      admin: {
        readOnly: true,
        description:
          "Indicates if the client's Stripe payment gateway is active",
      },
    },
  ],
};
