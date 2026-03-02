"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  ShieldCheckIcon,
  FileTextIcon,
  DownloadCloudIcon,
} from "lucide-react";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const trpc = useTRPC();
  const { data: session } = useQuery(trpc.auth.session.queryOptions());

  return (
    <div className="min-h-[calc(100vh-80px)] bg-neutral-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center space-y-8 mt-12">
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border shadow-sm text-neutral-600 text-sm font-medium mb-4">
          <ShieldCheckIcon className="size-4 text-emerald-600" />
          Secure Client Portal
        </div>

        {/* Hero Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900">
          Your Agency.
          <br /> <span className="text-neutral-400">Elevated.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
          Access your secure deliverables, review project scopes, and manage
          invoice payments in one professional dashboard.
        </p>

        {/* Calls to Action (Now Session Aware!) */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          {session?.user ? (
            <Button
              size="lg"
              className="w-full sm:w-auto bg-neutral-900 text-white hover:bg-neutral-800 text-base h-12 px-8"
              asChild
            >
              <Link href="/admin">
                Go to Admin Dashboard <ArrowRightIcon className="ml-2 size-4" />
              </Link>
            </Button>
          ) : (
            <>
              <Button
                size="lg"
                className="w-full sm:w-auto bg-neutral-900 text-white hover:bg-neutral-800 text-base h-12 px-8"
                asChild
              >
                <Link prefetch href="/sign-in">
                  Client Login <ArrowRightIcon className="ml-2 size-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-white text-base h-12 px-8"
                asChild
              >
                <Link prefetch href="/contact">
                  Work With Us
                </Link>
              </Button>
            </>
          )}
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-24 text-left pb-12">
          <div className="bg-white p-8 rounded-2xl border shadow-sm">
            <div className="size-12 bg-neutral-100 rounded-lg flex items-center justify-center mb-6">
              <FileTextIcon className="size-6 text-neutral-700" />
            </div>
            <h3 className="font-semibold text-xl mb-2 text-neutral-900">
              Centralized Invoices
            </h3>
            <p className="text-neutral-500 leading-relaxed">
              Review detailed scopes of work and pay securely via Stripe in
              seconds.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border shadow-sm">
            <div className="size-12 bg-neutral-100 rounded-lg flex items-center justify-center mb-6">
              <DownloadCloudIcon className="size-6 text-neutral-700" />
            </div>
            <h3 className="font-semibold text-xl mb-2 text-neutral-900">
              Locked Deliverables
            </h3>
            <p className="text-neutral-500 leading-relaxed">
              Access your high-res files and final project assets immediately
              upon payment.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border shadow-sm">
            <div className="size-12 bg-neutral-100 rounded-lg flex items-center justify-center mb-6">
              <ShieldCheckIcon className="size-6 text-neutral-700" />
            </div>
            <h3 className="font-semibold text-xl mb-2 text-neutral-900">
              Enterprise Security
            </h3>
            <p className="text-neutral-500 leading-relaxed">
              Dedicated multi-tenant architecture ensures your business data is
              isolated and protected.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
