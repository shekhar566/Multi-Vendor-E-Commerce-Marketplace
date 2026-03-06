"use client";

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CommandIcon, ShieldCheckIcon } from "lucide-react";

export const SignInView = () => {
  const router = useRouter();

  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const login = useMutation(
    trpc.auth.login.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.auth.session.queryFilter());
        router.push("/");
      },
    })
  );

  const form = useForm<z.infer<typeof loginSchema>>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    login.mutate(values);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
      {/* Left side: Form Panel */}
      <div className="bg-white h-screen w-full overflow-y-auto flex flex-col px-8 sm:px-16 lg:px-24 xl:px-32 relative">
        {/* Top Nav Area */}
        <div className="flex items-center justify-between pt-12 mb-12">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-neutral-900 p-1.5 rounded-md">
              <CommandIcon className="size-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-neutral-900">
              ShipSpace
            </span>
          </Link>
          <Button
            asChild
            variant="ghost"
            className="text-sm font-medium hover:bg-neutral-100 rounded-full"
          >
            <Link prefetch href="/sign-up">
              Create account
            </Link>
          </Button>
        </div>

        {/* Main Form Area */}
        <div className="flex-1 flex flex-col justify-center max-w-md w-full mx-auto pb-24">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <div className="space-y-2 mb-4">
                <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
                  Welcome back
                </h1>
                <p className="text-neutral-500">
                  Enter your credentials to access your secure client portal.
                </p>
              </div>

              <FormField
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-neutral-700">
                      Work Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-11 bg-neutral-50 border-neutral-200 focus-visible:ring-neutral-900"
                        placeholder="you@company.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-neutral-700 flex justify-between">
                      Password
                      <Link
                        href="/forgot-password"
                        className="text-xs text-neutral-500 hover:text-neutral-900 hover:underline"
                      >
                        Forgot?
                      </Link>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        className="h-11 bg-neutral-50 border-neutral-200 focus-visible:ring-neutral-900"
                        placeholder="••••••••"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                disabled={login.isPending}
                type="submit"
                className="h-11 mt-2 w-full bg-neutral-900 text-white hover:bg-neutral-800 transition-colors rounded-md font-medium"
              >
                {login.isPending ? "Authenticating..." : "Sign in securely"}
              </Button>
            </form>
          </Form>
        </div>
      </div>

      {/* Right side: Trust & Branding Panel */}
      <div className="hidden lg:flex flex-col justify-between h-screen w-full bg-neutral-900 text-white p-12 xl:p-24">
        <div>
          {/* Decorative Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm font-medium mb-8">
            <ShieldCheckIcon className="size-4 text-emerald-400" />
            <span className="text-neutral-200">256-bit Encrypted Portal</span>
          </div>
        </div>

        <div className="space-y-6 max-w-lg">
          <h2 className="text-4xl font-medium leading-tight">
            Manage your project scopes, invoices, and deliverables in one secure
            place.
          </h2>
          <p className="text-neutral-400 text-lg">
            Our dedicated client environment ensures your business assets and
            financial data are completely isolated and protected.
          </p>
        </div>

        <div className="flex items-center gap-4 text-neutral-500 text-sm">
          <span>© {new Date().getFullYear()} ShipSpace</span>
          <span>•</span>
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
};
