import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-[#f2f4ef] px-5 py-12 text-[#1f3b2d] sm:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#dce9df] blur-3xl" />
        <div className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-[#e8e4d7] blur-3xl" />
      </div>

      <section className="relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-2xl shadow-[#1f3b2d]/10 backdrop-blur">
        <div className="grid md:grid-cols-[0.9fr_1.1fr]">
          <div className="relative flex min-h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-[#1f3b2d] to-[#315944] p-10 text-white sm:min-h-80">
            <div aria-hidden="true" className="absolute -right-10 -top-12 h-48 w-48 rounded-full border border-white/10" />
            <div aria-hidden="true" className="absolute -bottom-20 -left-12 h-56 w-56 rounded-full border border-white/10" />
            <div className="relative text-center">
              <p className="text-8xl font-black leading-none tracking-tight sm:text-9xl">404</p>
              <div className="mx-auto mt-5 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90">
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="10.8" cy="10.8" r="6.8" />
                  <path strokeLinecap="round" d="m16 16 4.5 4.5M8.5 10.8h4.6M10.8 8.5v4.6" />
                </svg>
                <span>Page not found</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-12">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#758a65]">
              A little detour
            </p>
            <h1 className="max-w-md text-3xl font-bold leading-tight tracking-tight text-[#1f3b2d] sm:text-4xl">
              Looks like this page is off the menu.
            </h1>
            <p className="mt-4 max-w-md text-base leading-7 text-slate-600">
              We couldn't find the page you were looking for. It may have moved, or the address might be mistyped.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-xl bg-[#1f3b2d] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1f3b2d]/15 transition hover:-translate-y-0.5 hover:bg-[#294b39] focus:outline-none focus:ring-2 focus:ring-[#1f3b2d] focus:ring-offset-2"
              >
                <svg
                  aria-hidden="true"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="m10 19-7-7 7-7M3 12h18" />
                </svg>
                Back to home
              </Link>
            </div>

            <p className="mt-8 border-t border-slate-100 pt-5 text-xs font-medium tracking-wide text-slate-400">
              ERROR 404 <span className="mx-2 text-[#a3b29a]">/</span> THE PAGE ISN'T HERE
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
