import {
  UserIcon,
  BuildingIcon,
  CreditCardIcon,
  AlertTriangleIcon,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-(--breakpoint-md) mx-auto px-4 lg:px-12 py-8 pb-20">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900">
          Workspace Settings
        </h1>
        <p className="text-neutral-500 text-sm mt-1">
          Manage your agency profile, billing, and team access.
        </p>
      </div>

      <div className="space-y-6">
        {/* Profile Section */}
        <section className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-neutral-200 flex items-center gap-3">
            <UserIcon className="size-5 text-neutral-400" />
            <h2 className="text-lg font-semibold text-neutral-900">
              My Profile
            </h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium text-neutral-700">
                Full Name
              </label>
              <input
                type="text"
                defaultValue="Shekhar Chaudhary"
                className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                disabled
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-neutral-700">
                Email Address
              </label>
              <input
                type="email"
                defaultValue="admin@agency.com"
                className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
                disabled
              />
            </div>
            <button className="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors">
              Save Changes
            </button>
          </div>
        </section>

        {/* Agency Branding Section */}
        <section className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-neutral-200 flex items-center gap-3">
            <BuildingIcon className="size-5 text-neutral-400" />
            <h2 className="text-lg font-semibold text-neutral-900">
              Tenant Branding
            </h2>
          </div>
          <div className="p-6">
            <p className="text-sm text-neutral-500 mb-4">
              Customize the portal appearance for your clients. (tRPC upload
              coming soon)
            </p>
            <div className="flex items-center gap-4">
              <div className="size-16 rounded-lg border border-dashed border-neutral-300 bg-neutral-50 flex items-center justify-center text-xs text-neutral-400">
                Logo
              </div>
              <button className="px-4 py-2 bg-white border border-neutral-200 text-neutral-700 text-sm font-medium rounded-lg hover:bg-neutral-50 transition-colors">
                Upload Image
              </button>
            </div>
          </div>
        </section>

        {/* Billing Section */}
        <section className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-neutral-200 flex items-center gap-3">
            <CreditCardIcon className="size-5 text-neutral-400" />
            <h2 className="text-lg font-semibold text-neutral-900">
              Billing & Subscriptions
            </h2>
          </div>
          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-neutral-900">
                Pro Agency Plan
              </p>
              <p className="text-sm text-neutral-500">$99.00 / month</p>
            </div>
            <button className="px-4 py-2 bg-white border border-neutral-200 text-neutral-700 text-sm font-medium rounded-lg hover:bg-neutral-50 transition-colors">
              Manage in Stripe
            </button>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="bg-red-50/50 border border-red-200 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-red-200 flex items-center gap-3">
            <AlertTriangleIcon className="size-5 text-red-500" />
            <h2 className="text-lg font-semibold text-red-700">Danger Zone</h2>
          </div>
          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-red-900">
                Delete Workspace
              </p>
              <p className="text-sm text-red-700/80">
                Permanently delete all tenant data and deliverables.
              </p>
            </div>
            <button className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors whitespace-nowrap">
              Delete Workspace
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
