import { ArrowLeftIcon, ShieldCheckIcon } from "lucide-react";
import Link from "next/link";
import { ProductList, ProductListSkeleton } from "../components/product-list";
import { Suspense } from "react";

export const LibraryView = () => {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Sleek Enterprise Top Nav */}
      <nav className="p-4 bg-white w-full border-b border-neutral-200">
        <Link
          prefetch
          href="/"
          className="inline-flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors font-medium text-sm"
        >
          <ArrowLeftIcon className="size-4" />
          <span>Back to Dashboard</span>
        </Link>
      </nav>

      {/* Professional Header Area */}
      <header className="bg-white py-12 border-b border-neutral-200">
        <div className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 flex flex-col gap-y-3">
          <div className="flex items-center gap-2 text-emerald-600 mb-2">
            <ShieldCheckIcon className="size-5" />
            <span className="text-sm font-semibold tracking-wider uppercase">
              Secure Vault
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900">
            Client Deliverables
          </h1>
          <p className="text-neutral-500 text-lg max-w-2xl">
            Access your finalized project files, source code, and paid assets.
            Items appear here automatically once their associated invoice is
            settled.
          </p>
        </div>
      </header>

      {/* Vault Grid */}
      <section className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 py-10">
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList />
        </Suspense>
      </section>
    </div>
  );
};
