# 🚀 ShipSpace | B2B Client Portal SaaS

A production-grade, multi-tenant B2B client portal engineered for agencies. Built with **Next.js 15**, **Payload CMS**, **tRPC**, and **React Query**.

This project represents an architectural pivot from a legacy multi-tenant e-commerce codebase into a specialized, high-value SaaS environment. It focuses on secure data isolation, complex state management, and premium UI architecture.

---

## 🏗️ The Architecture & Features

- 🧩 **Multi-Tenant Data Isolation** – Securely isolated environments allowing multiple agencies to manage their respective clients from a single, unified codebase.
- 🔐 **Advanced RBAC** – Sophisticated routing and auth logic distinguishing between `super-admin` (agency owners) and `user` (clients), with strict restrictions on backend Payload CMS access.
- 🗂️ **Secure Deliverables Engine** – A protected, searchable library for project assets and high-res files routed dynamically by tenant ID.
- 💳 **Centralized Billing & Invoices** – Engineered a premium SaaS billing table UI, prepared for Stripe webhook integration to manage client scopes and payments.
- ⚡ **Aggressive Cache Optimization** – Custom authentication hooks that clear server-side Payload sessions and immediately nuke the client-side React Query cache to guarantee instant UI state updates.
- 🎨 **Scalable Premium UI** – Custom design system featuring segmented control navigation, smooth transitions, and high-end rounded layouts using TailwindCSS.

---

## 🧰 The Tech Stack

- **Core:** Next.js 15 (App Router), React, TypeScript
- **State & Data Fetching:** tRPC, Tanstack React Query
- **Backend & Auth:** Payload CMS, Node.js
- **Database:** MongoDB
- **Styling:** Tailwind CSS, Shadcn UI, Lucide Icons

---

## 🧠 Engineering Challenges Solved

Instead of building another standard clone, I focused on the "hard" problems of product engineering:
1. **The Architecture Pivot:** Successfully decoupling generic e-commerce dynamic routes into dedicated, secure B2B views (Deliverables, Invoices, Settings).
2. **Type-Safe Full-Stack Communication:** Leveraging tRPC to bridge the Next.js frontend and Payload backend, eliminating type mismatch errors across the wire.
3. **State Synchronization:** Handling the complex edge cases of user logouts in a deeply nested React Query environment to prevent stale data leaks across accounts.

---

## ⚙️ Local Development

```bash
# Clone the repository
git clone [https://github.com/YOURUSERNAME/shipspace-b2b-portal.git](https://github.com/YOURUSERNAME/shipspace-b2b-portal.git)

# Navigate into the workspace
cd shipspace-b2b-portal

# Install dependencies
bun install

# Run the development server
bun run dev
