"use client";

import { ArrowRightIcon } from "lucide-react";

export const ContactForm = () => {
  return (
    <form
      className="flex flex-col gap-6 relative z-10"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="first-name"
            className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2 ml-1"
          >
            First name
          </label>
          <input
            id="first-name"
            placeholder="Nick"
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 placeholder:text-zinc-700 transition-all"
          />
        </div>
        <div>
          <label
            htmlFor="last-name"
            className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2 ml-1"
          >
            Last name
          </label>
          <input
            id="last-name"
            placeholder="Patel"
            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 placeholder:text-zinc-700 transition-all"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2 ml-1"
        >
          Work Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="nick@agency.com"
          className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 placeholder:text-zinc-700 transition-all"
        />
      </div>
      <div>
        <label
          htmlFor="message"
          className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2 ml-1"
        >
          Project Details
        </label>
        <textarea
          id="message"
          rows={4}
          className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 placeholder:text-zinc-700 transition-all resize-none"
          placeholder="Tell us about your timeline, stack, and scope..."
        />
      </div>
      <button
        type="submit"
        className="h-12 mt-2 w-full rounded-xl bg-white text-black font-semibold hover:bg-zinc-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
      >
        Send Message
        <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </form>
  );
};
