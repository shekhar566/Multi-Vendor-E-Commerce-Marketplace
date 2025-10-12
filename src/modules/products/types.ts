import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export type ProductsGetManyOutput =
  inferRouterOutputs<AppRouter>["products"]["getMany"];
