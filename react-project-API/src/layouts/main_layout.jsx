import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

export default function Main_layout({}) {
  return (
    <div className="min-h-screen bg-[#d6d6e3]">
      <header className="bg-[#1f3b2d] text-white">
        <nav
          aria-label="Main navigation"
          className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8"
        >
          <Link to = '/' className="text-xl font-semibold tracking-normal">
            Recipes Around The world
          </Link>
          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              to="/login"
              className="hover:scale-110  rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
            >
              Log in
            </Link>

            <Link
              to="/signup"
              className="hover:scale-110 bg-white rounded-lg px-3 py-2 text-sm font-medium text-[#1f3b2d] transition hover:bg-emerald-50"
            >
              Sign up
            </Link>

          </div>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
