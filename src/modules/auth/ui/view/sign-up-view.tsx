"use client";

import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../schemas";
import {
  Form,
  FormControl,
  FormDescription,
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
import {
  CommandIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  FileLock2Icon,
  LayoutDashboardIcon,
} from "lucide-react";

export const SignUpView = () => {
  const router = useRouter();
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const register = useMutation(
    trpc.auth.register.mutationOptions({
      onError: (error) => {
        toast.error(error.message);
      },
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.auth.session.queryFilter());
        router.push("/");
      },
    })
  );

  const form = useForm<z.infer<typeof registerSchema>>({
    mode: "all",
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
    },
  });

  const onSubmit = (values: z.infer<typeof registerSchema>) => {
    register.mutate(values);
  };

  const username = form.watch("username");
  const usernameErrors = form.formState.errors.username;
  const showPreview = username && !usernameErrors;

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
            <Link prefetch href="/sign-in">
              Log in instead
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
                  Create client account
                </h1>
                <p className="text-neutral-500">
                  Set up your secure profile to access your project deliverables
                  and invoices.
                </p>
              </div>

              <FormField
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-neutral-700">
                      Company / Client Handle
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="h-11 bg-neutral-50 border-neutral-200 focus-visible:ring-neutral-900"
                        placeholder="e.g. apex-law"
                      />
                    </FormControl>
                    {showPreview && (
                      <FormDescription className="text-xs text-neutral-500">
                        Your secure workspace will be referenced as{" "}
                        <strong>@{username}</strong>
                      </FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                    <FormLabel className="text-sm font-medium text-neutral-700">
                      Password
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
                disabled={register.isPending}
                type="submit"
                className="h-11 mt-2 w-full bg-neutral-900 text-white hover:bg-neutral-800 transition-colors rounded-md font-medium"
              >
                {register.isPending
                  ? "Creating Account..."
                  : "Create secure account"}
              </Button>
            </form>
          </Form>
        </div>
      </div>

      {/* Right side: Trust & Feature Panel */}
      <div className="hidden lg:flex flex-col justify-between h-screen w-full bg-neutral-900 text-white p-12 xl:p-24 border-l border-neutral-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm font-medium mb-12 text-emerald-400">
            <ShieldCheckIcon className="size-4" />
            <span>Enterprise-Grade Security</span>
          </div>

          <h2 className="text-3xl xl:text-4xl font-medium leading-tight mb-12 max-w-lg">
            Everything you need to manage your agency partnership.
          </h2>

          {/* Feature List */}
          <div className="space-y-8 max-w-md">
            <div className="flex gap-4 items-center">
              <div className="shrink-0 mt-1 py-5 bg-white/10 p-2.5 rounded-lg border border-white/5">
                <CreditCardIcon className="size-5  text-neutral-300" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Secure Payments</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Approve and pay project invoices instantly via our encrypted
                  Stripe integration.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="shrink-0 mt-1 py-5 bg-white/10 p-2.5 rounded-lg border border-white/5">
                <FileLock2Icon className="size-5 text-neutral-300" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  Encrypted Deliverables
                </h3>
                <p className="text-neutral-400 leading-relaxed">
                  Access your source code, design files, and final assets the
                  second your invoice is settled.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="shrink-0 mt-1 py-5 bg-white/10 p-2.5 rounded-lg border border-white/5">
                <LayoutDashboardIcon className="size-5 text-neutral-300" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Client Dashboard</h3>
                <p className="text-neutral-400 leading-relaxed">
                  Track project scopes, review past retainers, and manage your
                  account in one central hub.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-neutral-500 text-sm">
          <span>© {new Date().getFullYear()} ShipSpace</span>
          <span>•</span>
          <Link
            href="/privacy"
            className="hover:text-neutral-300 transition-colors"
          >
            Privacy Policy
          </Link>
          <span>•</span>
          <Link
            href="/terms"
            className="hover:text-neutral-300 transition-colors"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </div>
  );
};
