"use client";

import { Button } from "@/components/ui/button";
import { formatCurrency, generateTenantURL } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import {
  CheckCheckIcon,
  LinkIcon,
  CalendarIcon,
  CreditCardIcon,
  FileTextIcon,
} from "lucide-react";
import dynamic from "next/dynamic";
import { RichText } from "@payloadcms/richtext-lexical/react";
import Image from "next/image";
import Link from "next/link";

const CartButton = dynamic(
  () => import("@/components/cart-button").then((mod) => mod.CartButton),
  {
    ssr: false,
    loading: () => (
      <Button disabled className="flex-1 bg-black text-white">
        Loading Checkout...
      </Button>
    ),
  }
);

interface ProductViewProps {
  productId: string;
  tenantSlug: string;
}

export const ProductView = ({ productId, tenantSlug }: ProductViewProps) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.products.getOne.queryOptions({ id: productId })
  );

  // --- START CODERABBIT FIX #1: MEMORY LEAK ---
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(window.location.href);
    toast.success("Invoice link copied");

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsCopied(false), 3000);
  };
  // --- END CODERABBIT FIX ---

  // Safely format the Due Date we added to the Payload CMS
  const formattedDueDate = data.dueDate
    ? new Date(data.dueDate as string).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Upon Receipt";

  // Dynamic styling for the Invoice Status badge
  const statusColor =
    data.paymentStatus === "Paid"
      ? "bg-emerald-100 text-emerald-800 border-emerald-200"
      : data.paymentStatus === "Overdue"
        ? "bg-red-100 text-red-800 border-red-200"
        : "bg-amber-100 text-amber-800 border-amber-200";

  return (
    <div className="px-4 lg:px-12 py-10">
      <div className="border rounded-sm bg-white overflow-hidden shadow-sm">
        {/* Header Banner */}
        <div className="relative aspect-[5/1] border-b bg-neutral-50 flex items-center justify-center overflow-hidden">
          {data.image?.url ? (
            <Image
              src={data.image.url}
              alt={data.name}
              fill
              className="object-cover opacity-80"
            />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <FileTextIcon className="size-10" />
              <span className="font-medium">Invoice Preview</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6">
          {/* Left Column: Scope of Work */}
          <div className="col-span-4 border-r">
            <div className="p-6 border-b">
              <h1 className="text-4xl font-medium tracking-tight text-neutral-900">
                {data.name}
              </h1>
            </div>

            <div className="flex border-b bg-neutral-50/50">
              <div className="px-6 py-4 flex items-center justify-center border-r bg-white">
                <p className="text-xl font-bold text-neutral-900">
                  {formatCurrency(data.price)}
                </p>
              </div>

              <div className="px-6 py-4 flex items-center justify-center">
                <Link
                  href={generateTenantURL(tenantSlug)}
                  className="flex items-center gap-2 hover:opacity-80 transition"
                >
                  {data.tenant.image?.url ? (
                    <Image
                      src={data.tenant.image.url}
                      alt={data.tenant.name}
                      width={24}
                      height={24}
                      className="rounded-full border shrink-0 size-[24px]"
                    />
                  ) : (
                    <div className="size-[24px] bg-neutral-200 rounded-full border" />
                  )}
                  <p className="text-sm font-medium text-neutral-600">
                    {data.tenant.name}
                  </p>
                </Link>
              </div>
            </div>

            <div className="p-6">
              <h2 className="text-lg font-semibold mb-4 text-neutral-900">
                Scope of Work
              </h2>
              {data.description ? (
                <div className="prose prose-neutral max-w-none">
                  <RichText data={data.description as never} />
                </div>
              ) : (
                <p className="font-medium text-muted-foreground">
                  No description provided for this invoice.
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Invoice Status & Actions */}
          <div className="col-span-2 bg-neutral-50/30">
            <div className="flex flex-col h-full">
              {/* Action Buttons */}
              <div className="flex flex-col gap-4 p-6 border-b bg-white">
                <div className="flex flex-row items-center gap-2">
                  <CartButton
                    isPurchased={data.isPurchased}
                    productId={productId}
                    tenantSlug={tenantSlug}
                  />
                  {/* Hooked up the new clean handleCopy function right here! */}
                  <Button
                    className="size-12 shrink-0 cursor-pointer bg-white border shadow-sm hover:bg-neutral-50 text-neutral-900"
                    onClick={handleCopy}
                    disabled={isCopied}
                  >
                    {isCopied ? (
                      <CheckCheckIcon className="size-4 text-emerald-600" />
                    ) : (
                      <LinkIcon className="size-4" />
                    )}
                  </Button>
                </div>

                <div className="text-center">
                  {data.isPurchased ? (
                    <span className="text-sm font-medium text-emerald-600 flex justify-center items-center gap-2">
                      <CheckCheckIcon className="size-4" /> Securely Paid
                    </span>
                  ) : (
                    <span className="text-sm font-medium text-muted-foreground flex justify-center items-center gap-2">
                      <CreditCardIcon className="size-4" /> Secure Stripe
                      Checkout
                    </span>
                  )}
                </div>
              </div>

              {/* Invoice Details Card */}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-4">Invoice Details</h3>
                <div className="space-y-4">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-500">
                      Payment Status
                    </span>
                    <div
                      className={`px-2.5 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider ${statusColor}`}
                    >
                      {data.paymentStatus || "Pending"}
                    </div>
                  </div>

                  {/* Due Date */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-neutral-500 flex items-center gap-2">
                      <CalendarIcon className="size-4" /> Due Date
                    </span>
                    <span className="text-sm font-medium">
                      {formattedDueDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ProductViewSkeleton = () => {
  return (
    <div className="px-4 lg:px-12 py-10">
      <div className="border rounded-sm bg-white overflow-hidden shadow-sm animate-pulse">
        <div className="relative aspect-[5/1] border-b bg-neutral-100" />
        <div className="h-96 bg-white" />
      </div>
    </div>
  );
};
