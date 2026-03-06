"use client";
import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import { SearchIcon, FolderOpenIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";

interface Props {
  disabled?: boolean;
  defaultValue?: string | undefined;
  onChange?: (value: string) => void;
}

export const SearchInput = ({ disabled, defaultValue, onChange }: Props) => {
  const [searchValue, setSearchValue] = useState(defaultValue || "");

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChange?.(searchValue);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchValue, onChange]);

  return (
    <div className="flex items-center gap-3 w-full">
      {/* Sleek Enterprise Search Input */}
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500 gap-2.5" />
        <Input
          className="pl-9 h-11 bg-neutral-50 border-neutral-200 focus-visible:ring-neutral-900"
          placeholder="Search invoices, deliverables, or projects..."
          disabled={disabled}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {/* Authenticated Action Button */}
      {session.data?.user && (
        <Button
          asChild
          className="h-11 shrink-0 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors hidden sm:flex"
        >
          {/* We keep the /library route if that's where your downloads are, but label it "Deliverables" */}
          <Link prefetch href="/library">
            <FolderOpenIcon className="mr-2 size-4" />
            Deliverables
          </Link>
        </Button>
      )}
    </div>
  );
};
