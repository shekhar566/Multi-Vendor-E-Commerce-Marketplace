import { Suspense } from "react";
import { ProductList, ProductListSkeleton } from "../components/product-list";

interface Props {
  category?: string;
  tenantSlug?: string;
  narrowView?: boolean;
  hideHeader?: boolean;
}

export const ProductListView = ({
  category,
  tenantSlug,
  narrowView,
  hideHeader,
}: Props) => {
  return (
    <div className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 py-2 flex flex-col gap-6">
      {!hideHeader && (
        <div className="flex flex-col gap-2 border-b border-neutral-200 pb-4">
          <h2 className="text-xl font-semibold text-neutral-900">
            Invoices & Deliverables
          </h2>
        </div>
      )}

      <div className="w-full pt-4">
        <Suspense fallback={<ProductListSkeleton narrowView={narrowView} />}>
          <ProductList
            category={category}
            tenantSlug={tenantSlug}
            narrowView={narrowView}
          />
        </Suspense>
      </div>
    </div>
  );
};
