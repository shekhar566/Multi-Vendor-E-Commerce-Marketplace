import Link from "next/link";
import { CreditCardIcon, DownloadIcon, CheckCircle2Icon } from "lucide-react";

import { cn } from "@/lib/utils";
import { useCart } from "@/modules/checkout/hooks/use-cart";
import { Button } from "./ui/button";

interface Props {
  tenantSlug: string;
  productId: string;
  isPurchased?: boolean;
}

export const CartButton = ({ tenantSlug, productId, isPurchased }: Props) => {
  const cart = useCart(tenantSlug);

  // POST-PAYMENT STATE: Client has paid and unlocks the files
  if (isPurchased) {
    return (
      <Button
        variant="elevated"
        asChild
        className="flex-1 font-medium bg-emerald-600 text-white hover:bg-emerald-700 border-emerald-700 shadow-sm"
      >
        <Link
          prefetch
          href={`${process.env.NEXT_PUBLIC_APP_URL}/library/${productId}`}
          className="flex items-center justify-center gap-2"
        >
          <DownloadIcon className="size-4" />
          Access Deliverables
        </Link>
      </Button>
    );
  }

  // PRE-PAYMENT STATE: Client needs to pay the invoice
  const inCart = cart.isProductInCart(productId);

  return (
    <Button
      variant="elevated"
      className={cn(
        "flex-1 font-semibold transition-all shadow-sm flex items-center justify-center gap-2",
        inCart
          ? "bg-white text-neutral-900 border-2 border-neutral-900 hover:bg-neutral-50"
          : "bg-neutral-900 text-white hover:bg-neutral-800"
      )}
      onClick={() => cart.toggleProduct(productId)}
    >
      {inCart ? (
        <>
          <CheckCircle2Icon className="size-4 text-emerald-600" />
          Ready to Pay (Go to Checkout)
        </>
      ) : (
        <>
          <CreditCardIcon className="size-4" />
          Approve & Pay Invoice
        </>
      )}
    </Button>
  );
};
