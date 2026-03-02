"use client";
import { useState } from "react";
import { MenuIcon, CommandIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { NavbarSidebar } from "./navbarSidebar";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

const NavbarItem = ({ href, children, isActive }: NavbarItemProps) => {
  return (
    <Button
      asChild
      variant="ghost"
      className={cn(
        "bg-transparent hover:bg-neutral-100 rounded-full px-4 text-sm font-medium transition-colors",
        isActive && "bg-neutral-100 text-neutral-900"
      )}
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

// Simplified for a B2B Agency Landing Page
const navbarItems = [
  { href: "/", children: "Overview" },
  { href: "/features", children: "Services" },
  { href: "/contact", children: "Contact" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setisSidebaropen] = useState(false);

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  return (
    <nav className="h-16 flex border-b justify-between items-center bg-white px-6">
      <Link href="/" className="flex items-center gap-2">
        <div className="bg-neutral-900 p-1.5 rounded-md">
          <CommandIcon className="size-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-neutral-900">
          AgencyPortal
        </span>
      </Link>

      <NavbarSidebar
        items={navbarItems}
        open={isSidebarOpen}
        onOpenChange={setisSidebaropen}
      />

      <div className="items-center gap-1 hidden lg:flex">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>

      {session.data?.user ? (
        <div className="hidden lg:flex">
          <Button
            asChild
            className="rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition-colors px-6"
          >
            <Link href="/admin">Admin Dashboard</Link>
          </Button>
        </div>
      ) : (
        <div className="hidden lg:flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            className="rounded-full hover:bg-neutral-100 transition-colors px-6"
          >
            <Link prefetch href="/sign-in">
              Client Login
            </Link>
          </Button>
          <Button
            asChild
            className="rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition-colors px-6"
          >
            <Link prefetch href="/contact">
              Work With Us
            </Link>
          </Button>
        </div>
      )}

      <div className="flex lg:hidden items-center justify-center">
        <Button
          variant="ghost"
          className="size-10 border-transparent p-0"
          onClick={() => setisSidebaropen(true)}
        >
          <MenuIcon className="size-5" />
        </Button>
      </div>
    </nav>
  );
};
