import { CodeIcon, LayoutIcon, LineChartIcon } from "lucide-react";

export const metadata = {
  title: "Services | ShipSpace",
};

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-(--breakpoint-xl) px-6 lg:px-12">
        {/* Header */}
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold text-emerald-600 tracking-wide uppercase">
            Enterprise Solutions
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
            Everything you need to scale
          </p>
          <p className="mt-6 text-lg text-neutral-500">
            We specialize in high-performance web architecture, custom SaaS
            platforms, and digital transformation for modern businesses.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
              <dt className="flex items-center gap-x-3 text-lg font-semibold text-neutral-900 mb-4">
                <div className="bg-white p-2 rounded-lg shadow-sm border border-neutral-200">
                  <CodeIcon className="size-5 text-neutral-900" />
                </div>
                Full-Stack Engineering
              </dt>
              <dd className="flex flex-auto flex-col text-base text-neutral-500">
                <p className="flex-auto">
                  Custom web applications built with Next.js, React, and robust
                  backend architectures designed for massive scale.
                </p>
              </dd>
            </div>

            <div className="flex flex-col bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
              <dt className="flex items-center gap-x-3 text-lg font-semibold text-neutral-900 mb-4">
                <div className="bg-white p-2 rounded-lg shadow-sm border border-neutral-200">
                  <LayoutIcon className="size-5 text-neutral-900" />
                </div>
                UI/UX Architecture
              </dt>
              <dd className="flex flex-auto flex-col text-base text-neutral-500">
                <p className="flex-auto">
                  Pixel-perfect, conversion-optimized interfaces that provide
                  your clients with a world-class user experience.
                </p>
              </dd>
            </div>

            <div className="flex flex-col bg-neutral-50 p-8 rounded-2xl border border-neutral-100">
              <dt className="flex items-center gap-x-3 text-lg font-semibold text-neutral-900 mb-4">
                <div className="bg-white p-2 rounded-lg shadow-sm border border-neutral-200">
                  <LineChartIcon className="size-5 text-neutral-900" />
                </div>
                Technical Consulting
              </dt>
              <dd className="flex flex-auto flex-col text-base text-neutral-500">
                <p className="flex-auto">
                  Codebase audits, performance optimization, and architectural
                  planning for your next major product pivot.
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
