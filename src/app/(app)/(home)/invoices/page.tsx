"use client";

import Link from "next/link";

// Temporary mock type until you build the Payload 'orders' collection
type MockInvoice = {
  id: string;
  createdAt: string;
  total: number;
  status: "Paid" | "Pending";
  tenant: { name: string };
};

export default function InvoicesPage() {
  // Hardcoded mock data to unblock the UI compilation
  const invoices: MockInvoice[] = [
    {
      id: "inv_699fde1074e0dd2894cb66df",
      createdAt: new Date().toISOString(),
      total: 450000, // $4,500.00 in cents
      status: "Paid",
      tenant: { name: "Nick" },
    },
    {
      id: "inv_712abc9984e0dd2894cb77zz",
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      total: 125000, // $1,250.00 in cents
      status: "Pending",
      tenant: { name: "Nick" },
    },
  ];

  return (
    <div className="max-w-(--breakpoint-xl) mx-auto px-4 lg:px-12 py-8">
      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500">
              <tr>
                <th className="px-6 py-4 font-medium">Invoice ID</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-200">
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="hover:bg-neutral-50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/tenants/${invoice.tenant.name.toLowerCase()}/invoices/${invoice.id}`}
                      className="font-medium text-neutral-900 group-hover:text-blue-600 transition-colors"
                    >
                      #{invoice.id.slice(-6).toUpperCase()}
                    </Link>
                  </td>

                  <td className="px-6 py-4 text-neutral-500">
                    {new Date(invoice.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-neutral-900 font-medium">
                    ${(invoice.total / 100).toFixed(2)}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        invoice.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
