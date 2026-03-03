import { SearchParams } from "nuqs/server";
import { laodProductFilters } from "@/modules/products/search-params";
import { getQueryClient, trpc } from "@/trpc/server";
import { DEFAULT_LIMIT } from "@/constants";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { FileTextIcon } from "lucide-react";

interface Props {
  searchParams: Promise<SearchParams>;
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

const Page = async ({ searchParams, params }: Props) => {
  const { slug } = await params;
  const filters = await laodProductFilters(searchParams);

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(
    trpc.products.getMany.infiniteQueryOptions({
      ...filters,
      tenantSlug: slug,
      limit: DEFAULT_LIMIT,
    })
  );

  return (
    <div className="bg-neutral-50 min-h-[calc(100vh-64px)] py-10">
      <div className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-white rounded-lg border shadow-sm">
            <FileTextIcon className="size-6 text-neutral-700" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
            Client Dashboard
          </h1>
        </div>
        <p className="text-neutral-500 text-lg max-w-2xl">
          Review your project scopes, access deliverables, and manage pending
          invoices securely.
        </p>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductListView tenantSlug={slug} narrowView />
      </HydrationBoundary>
    </div>
  );
};

export default Page;
