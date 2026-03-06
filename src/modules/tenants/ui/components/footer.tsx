import { CommandIcon } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-neutral-200 mt-auto">
      <div className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2 text-neutral-900">
          <div className="bg-neutral-900 p-1 rounded-md">
            <CommandIcon className="size-4 text-white" />
          </div>
          <span className="font-semibold tracking-tight text-lg">
            ShipSpace
          </span>
        </div>

        {/* Legal & Support Links */}
        <div className="flex items-center gap-6 text-sm font-medium text-neutral-500">
          <Link
            href="/privacy"
            className="hover:text-neutral-900 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="hover:text-neutral-900 transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href="/contact"
            className="hover:text-neutral-900 transition-colors"
          >
            Client Support
          </Link>
        </div>

        {/* Copyright */}
        <div className="text-sm text-neutral-400 font-medium">
          &copy; {currentYear} ShipSpace, LLC.
        </div>
      </div>
    </footer>
  );
};
