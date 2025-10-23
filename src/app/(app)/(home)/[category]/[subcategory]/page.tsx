import { laodProductFilters } from "@/modules/products/search-params";
import { ProductListViews } from "@/modules/products/ui/views/product-list-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SearchParams } from "nuqs/server";

interface Props {
  params: Promise<{
    subcategory: string;
  }>;
  searchParams: Promise<SearchParams>;
}

const page = async ({ params, searchParams }: Props) => {
  const { subcategory } = await params;
  const filters = await laodProductFilters(searchParams);

  console.log(JSON.stringify(filters), "THIS IS FROM RSC");

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({ category: subcategory, ...filters })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListViews category={subcategory} />
    </HydrationBoundary>
  );
};

export default page;
