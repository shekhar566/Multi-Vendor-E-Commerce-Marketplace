import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

export type ReviewsGetOneOutput =
  inferRouterOutputs<AppRouter>["reviews"]["getOne"];
