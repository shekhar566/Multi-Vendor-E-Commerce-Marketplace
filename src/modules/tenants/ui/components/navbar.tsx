"use client";
import { Button } from "@/components/ui/button";
import { generateTenantURL } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ReceiptTextIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";

const CheckoutButton = dynamic(
  () =>
    import("@/modules/checkout/ui/components/checkout-button").then(
      (mod) => mod.CheckoutButton
    ),
  {
    ssr: false,
    loading: () => (
      <Button disabled variant="outline" className="bg-white">
        <ReceiptTextIcon className="size-4 mr-2" />
        Loading...
      </Button>
    ),
  }
);

interface Props {
  slug: string;
}

export const Navbar = ({ slug }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({ slug }));
  return (
    <nav className="h-16 border-b font-medium bg-white">
      <div
        className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4
      lg:px-12"
      >
        <Link
          href={generateTenantURL(slug)}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          {data.image?.url ? (
            <Image
              src={data.image.url}
              width={32}
              height={32}
              className="rounded-md border shrink-0 object-cover"
              alt={slug}
            />
          ) : (
            <div className="size-8 rounded-md bg-neutral-100 border flex items-center justify-center">
              <span className="text-xs font-bold text-neutral-400">
                {data.name.charAt(0)}
              </span>
            </div>
          )}
          <p className="text-lg font-semibold text-neutral-900">{data.name}</p>
        </Link>
        <CheckoutButton hideIfEmpty={slug} tenantSlug={slug} />
      </div>
    </nav>
  );
};

export const NavbarSkeleton = () => {
  return (
    <nav className="h-16 border-b font-medium bg-white">
      <div
        className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4
          lg:px-12"
      >
        <div className="w-32 h-8 bg-neutral-100 animate-pulse rounded-md" />
        <Button disabled variant="outline" className="bg-white">
          <ReceiptTextIcon className="size-4" />
        </Button>
      </div>
    </nav>
  );
};
