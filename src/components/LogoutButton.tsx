"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { LogOutIcon, Loader2Icon } from "lucide-react";

export const LogoutButton = () => {
  const router = useRouter();
  const queryClient = useQueryClient(); // Brings in React Query's memory manager
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // 1. Tell Payload to destroy the backend cookie
      await fetch("/api/users/logout", { method: "POST" });

      // 2. Clear React Query cache for instant client-side updates
      queryClient.clear();

      // 3. Force a hard browser reload to wipe the Next.js Server Component cache
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isLoggingOut ? (
        <Loader2Icon className="size-4 animate-spin text-neutral-400 cursor-pointer" />
      ) : (
        <LogOutIcon className="size-4" />
      )}
      {isLoggingOut ? "Logging out..." : "Logout"}
    </button>
  );
};
