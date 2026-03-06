import { CommandIcon } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex border-t border-neutral-200 justify-between items-center font-medium p-6 bg-white text-sm text-neutral-500">
      <div className="flex items-center gap-2 text-neutral-900">
        <CommandIcon className="size-4" />
        <span className="font-semibold tracking-tight">ShipSpace</span>
        <span className="text-neutral-400 font-normal ml-1">
          &copy; {currentYear}
        </span>
      </div>

      <div className="flex items-center gap-6">
        <Link
          href="/privacy"
          className="hover:text-neutral-900 transition-colors"
        >
          Privacy
        </Link>
        <Link
          href="/terms"
          className="hover:text-neutral-900 transition-colors"
        >
          Terms
        </Link>
      </div>
    </footer>
  );
};
