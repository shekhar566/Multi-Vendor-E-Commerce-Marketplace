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
import { LogoutButton } from "@/components/LogoutButton";

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
          ShipSpace
        </span>
      </Link>

      <NavbarSidebar
        items={navbarItems}
        open={isSidebarOpen}
        onOpenChange={setisSidebaropen}
      />

      {/* Center Links (Hidden on mobile) */}
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

      {/* Right Side Auth / Actions */}
      {session.data?.user ? (
        <div className="hidden lg:flex items-center gap-4">
          <span className="text-sm font-medium text-neutral-500">
            {session.data.user.email}
          </span>
          <Button
            asChild
            className="rounded-full bg-neutral-900 text-white hover:bg-neutral-800 transition-colors px-6"
          >
            {/* <Link href="/">Client Portal</Link> */}
            <LogoutButton />
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

      {/* Mobile Menu Toggle */}
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
