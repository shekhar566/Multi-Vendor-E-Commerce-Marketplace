import { MailIcon, MapPinIcon } from "lucide-react";

export const metadata = {
  title: "Contact | ShipSpace",
};

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-(--breakpoint-xl) px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Side: Text & Info */}
        <div>
          <h2 className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl">
            Let&apos;s build something great.
          </h2>
          <p className="mt-6 text-lg text-neutral-500">
            Ready to transform your digital infrastructure? Drop us a line and
            we will get back to you within 24 hours to discuss your project
            scope.
          </p>
          <dl className="mt-12 space-y-8 text-base text-neutral-500">
            <div className="flex gap-x-4 items-center">
              <dt className="flex-none">
                <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                  <MailIcon className="h-6 w-6 text-neutral-900" />
                </div>
              </dt>
              <dd>
                <a
                  className="hover:text-neutral-900 font-medium transition-colors"
                  href="mailto:hello@shipSpace.com"
                >
                  hello@shipSpace.com
                </a>
              </dd>
            </div>
            <div className="flex gap-x-4 items-center">
              <dt className="flex-none">
                <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-100">
                  <MapPinIcon className="h-6 w-6 text-neutral-900" />
                </div>
              </dt>
              <dd className="font-medium text-neutral-900">
                Bengaluru, India
                <br />
                <span className="text-neutral-500 font-normal">
                  Remote Worldwide
                </span>
              </dd>
            </div>
          </dl>
        </div>

        {/* Right Side: Visual Form */}
        <div className="bg-neutral-50 p-8 sm:p-10 rounded-3xl border border-neutral-200">
          <form className="flex flex-col gap-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-neutral-900 mb-2"
                >
                  First name
                </label>
                <input
                  id="first-name"
                  placeholder="John"
                  className="h-11 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-neutral-900 mb-2"
                >
                  Last name
                </label>
                <input
                  id="last-name"
                  placeholder="Doe"
                  className="h-11 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-neutral-900 mb-2"
              >
                Work Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="john@company.com"
                className="h-11 w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-neutral-900 mb-2"
              >
                Project Details
              </label>
              <textarea
                id="message"
                rows={4}
                className="block w-full rounded-md border border-neutral-200 bg-white px-3 py-2 text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 sm:text-sm"
                placeholder="Tell us about your timeline and budget..."
              />
            </div>
            <button
              type="submit"
              className="h-11 mt-2 w-full rounded-md bg-neutral-900 text-white hover:bg-neutral-800 font-medium transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
