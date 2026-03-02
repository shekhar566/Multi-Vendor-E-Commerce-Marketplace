import { formatCurrency, generateTenantURL } from "@/lib/utils";
import { ReceiptTextIcon, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  id: string;
  name: string;
  imageUrl?: string | null;
  tenantSlug: string;
  tenantImageUrl?: string | null;
  // STRIPPED: Removed reviewRating and reviewCount entirely!
  price: number;
}

export const ProductCard = ({
  id,
  name,
  imageUrl,
  tenantSlug,
  tenantImageUrl,
  price,
}: ProductCardProps) => {
  const router = useRouter();

  const handleUserClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(generateTenantURL(tenantSlug));
  };

  return (
    <Link
      href={`${generateTenantURL(tenantSlug)}/products/${id}`}
      className="group block h-full"
    >
      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden h-full flex flex-col transition-all duration-200 hover:border-neutral-300 hover:shadow-md">
        {/* Header / Thumbnail Area */}
        <div className="p-5 border-b border-neutral-100 bg-neutral-50/50 flex items-center gap-4">
          <div className="size-12 rounded-lg bg-white border border-neutral-200 shadow-sm flex items-center justify-center shrink-0 overflow-hidden">
            {imageUrl ? (
              <Image
                alt={name}
                width={48}
                height={48}
                src={imageUrl}
                className="object-cover w-full h-full"
              />
            ) : (
              <ReceiptTextIcon className="size-5 text-neutral-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-semibold text-neutral-900 truncate group-hover:text-neutral-600 transition-colors">
              {name}
            </h2>
            <div
              className="flex items-center gap-1.5 mt-1 cursor-pointer hover:opacity-80 transition-opacity w-fit"
              onClick={handleUserClick}
            >
              {tenantImageUrl ? (
                <Image
                  alt={tenantSlug}
                  src={tenantImageUrl}
                  width={14}
                  height={14}
                  className="rounded-full border border-neutral-200 shrink-0 object-cover"
                />
              ) : (
                <div className="size-[14px] rounded-full bg-neutral-200 border border-neutral-300 shrink-0" />
              )}
              <p className="text-xs font-medium text-neutral-500 truncate">
                {tenantSlug}
              </p>
            </div>
          </div>
        </div>

        {/* Footer / Price Area */}
        <div className="p-5 flex items-center justify-between mt-auto bg-white">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-0.5">
              Amount Due
            </span>
            <span className="text-lg font-bold text-neutral-900">
              {formatCurrency(price)}
            </span>
          </div>

          {/* Interactive Arrow Button */}
          <div className="size-8 rounded-full bg-neutral-50 flex items-center justify-center group-hover:bg-neutral-900 transition-colors border border-neutral-200 group-hover:border-neutral-900">
            <ArrowRightIcon className="size-4 text-neutral-400 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export const ProductCardSkeleton = () => {
  return (
    <div className="w-full h-[140px] bg-neutral-100 border border-neutral-200 rounded-xl animate-pulse" />
  );
};
