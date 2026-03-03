import { cn, formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FileTextIcon, Trash2Icon } from "lucide-react";

interface CheckoutItemProps {
  isLast?: boolean;
  imageUrl?: string | null;
  name: string;
  productUrl: string;
  tenantUrl: string;
  tenantName: string;
  price: number;
  onRemove: () => void;
}

export const CheckoutItem = ({
  isLast,
  imageUrl,
  name,
  productUrl,
  tenantUrl,
  tenantName,
  price,
  onRemove,
}: CheckoutItemProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-4 py-4  px-4 border-b",
        isLast && "border-b-0"
      )}
    >
      {/* Invoice Thumbnail or Document Icon */}
      <div className="shrink-0 rounded-md border bg-neutral-50 flex items-center justify-center overflow-hidden size-14 shadow-sm">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            width={56}
            height={56}
            className="object-cover w-full h-full"
          />
        ) : (
          <FileTextIcon className="size-5 text-neutral-400" />
        )}
      </div>

      {/* Invoice Details */}
      <div className="flex-1 flex flex-col justify-center min-w-0">
        <Link href={productUrl} className="truncate group">
          <h4 className="font-semibold text-neutral-900 group-hover:text-neutral-600 transition-colors truncate">
            {name}
          </h4>
        </Link>
        <Link href={tenantUrl} className="truncate group">
          <p className="text-sm font-medium text-neutral-500 group-hover:text-neutral-700 transition-colors truncate">
            {tenantName}
          </p>
        </Link>
      </div>

      {/* Price & Action */}
      <div className="flex flex-col items-end justify-center gap-1 shrink-0 ml-4">
        <p className="font-bold text-neutral-900">{formatCurrency(price)}</p>
        <button
          type="button"
          className="text-xs font-medium text-neutral-400 hover:text-red-600 flex items-center gap-1 transition-colors cursor-pointer"
          onClick={onRemove}
        >
          <Trash2Icon className="size-3" />
          <span>Remove</span>
        </button>
      </div>
    </div>
  );
};
