import { DEFAULT_LIMIT } from "@/constants";
import { laodProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs";

interface Props {
  searchParams: Promise<SearchParams>;
}

const page = async ({ searchParams }: Props) => {
  const filters = await laodProductFilters(searchParams);

  console.log(JSON.stringify(filters), "THIS IS FROM RSC");

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      limit: DEFAULT_LIMIT,
    })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView />
    </HydrationBoundary>
  );
};

export default page;
