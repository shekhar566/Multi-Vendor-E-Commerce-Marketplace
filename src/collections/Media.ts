import { isSuperAdmin } from "@/lib/access";
import type { CollectionConfig } from "payload";
import { upload } from "payload/shared";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  admin: {
    hidden: ({ user }) => !isSuperAdmin(user),
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: true,
};
