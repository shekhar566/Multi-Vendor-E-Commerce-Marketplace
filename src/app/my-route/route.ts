import configPromise from "@payload-config";
import { getPayload } from "payload";

export const GET = async () => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    collection: "categories",
  });

  return Response.json(data);
};

// "PAYLOAD_CONFIG_PATH='./src/payload.config.ts' payload generate:types"
