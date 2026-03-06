"use client";

import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { useProductFilters } from "@/modules/products/hooks/use-product-filters";

export default function DeliverablesPage() {
  const trpc = useTRPC();
  const [filters] = useProductFilters();

  const { data } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({
      search: filters.search,
    })
  );

  const deliverables = data?.docs || [];

  return (
    <div className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deliverables.map((deliverable) => (
          // Swapped the <div> for a Next.js <Link>
          // Assuming you want to route to /deliverables/[slug] or [id]
          <Link
            key={deliverable.id}
            // Dynamically building the multi-tenant URL based on your data!
            href={`/tenants/${deliverable.tenant?.slug || deliverable.tenant?.name?.toLowerCase() || deliverable.tenant?.id}/products/${deliverable.id}`}
            className="block bg-white border border-neutral-200 rounded-xl p-6 hover:shadow-md transition-shadow group relative z-50 cursor-pointer"
          >
            <h3 className="font-semibold text-neutral-900  transition-colors">
              {deliverable.name || "Unnamed File"}
            </h3>

            <p className="text-sm text-neutral-500 mt-2 line-clamp-2">
              Click to view project files and scope.
            </p>
          </Link>
        ))}

        {deliverables.length === 0 && (
          <div className="col-span-full py-12 text-center text-neutral-500">
            No deliverables found matching your search.
          </div>
        )}
      </div>
    </div>
  );
}
