import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { CircleXIcon, ShieldCheckIcon } from "lucide-react";

interface CheckoutSidebarProps {
  total: number;
  onPurchase: () => void;
  isCancled?: boolean; // Keeping your original prop name so we don't break the parent!
  disabled?: boolean;
}

export const CheckoutSidebar = ({
  total,
  onPurchase,
  isCancled,
  disabled,
}: CheckoutSidebarProps) => {
  return (
    <div className="border rounded-md overflow-hidden bg-white shadow-sm flex flex-col">
      {/* Added a professional header */}
      <div className="bg-neutral-50 px-4 py-3 border-b">
        <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">
          Invoice Summary
        </h3>
      </div>

      <div className="flex items-center justify-between p-4 border-b">
        <h4 className="font-medium text-lg text-neutral-900">Amount Due</h4>
        <p className="font-bold text-xl text-neutral-900">
          {formatCurrency(total)}
        </p>
      </div>

      <div className="p-4 flex flex-col gap-3 items-center justify-center bg-neutral-50/50">
        <Button
          variant="elevated"
          disabled={disabled}
          onClick={onPurchase}
          size="lg"
          className="text-base w-full text-white bg-neutral-900 hover:bg-neutral-800 shadow-sm cursor-pointer flex items-center gap-2"
        >
          <ShieldCheckIcon className="size-4" />
          Proceed to Secure Payment
        </Button>
        {/* Added a trust signal for corporate clients */}
        <p className="text-xs text-neutral-500 text-center flex items-center gap-1">
          Payments processed securely via Stripe
        </p>
      </div>

      {isCancled && (
        <div className="p-4 flex justify-center items-center border-t bg-red-50/50">
          <div
            className="bg-white border border-red-200 text-red-800 font-medium px-4 py-3 
            rounded-md flex items-center w-full shadow-sm"
          >
            <div className="flex items-center">
              <CircleXIcon className="size-5 mr-2 text-red-600" />
              <span className="text-sm">
                Payment failed or was canceled. Please try again.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
