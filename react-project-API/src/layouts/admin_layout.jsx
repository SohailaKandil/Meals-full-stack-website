import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import {use_auth} from '../safe_routes/context_provider'

export default function Admin_layout() {
    const {user_name} = use_auth();
    const {log_out} = use_auth()

    return (
    <div className="min-h-screen bg-[#d6d6e3]">
      <header className="bg-[#1f3b2d] text-white">
        <nav
          aria-label="Admin navigation"
          className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8"
        >
            <Link to = '/' className="text-xl font-semibold tracking-normal">
                Recipes Around The world
            </Link>

            <div className="flex items-center gap-3 sm:gap-5">
                <Link
                    to="/addrecipe"
                    className="hover:scale-110  rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
                    >
                    Add Recipe
                </Link>

                <Link
                    to="/acceptrecipes"
                    className="hover:scale-110  rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
                    >
                    Accept Recipes
                </Link>
            
                <button onClick={log_out} className="hover:scale-110  rounded-lg px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white">
                  Log Out
                </button>

                <p className="flex flex-col items-end leading-tight">
                    <span className="text-sm font-medium tracking-wide text-[#cbd5c0]">
                        Welcome
                    </span>
                    <span className="mt-1 text-lg font-bold text-[#cbd5c0]">
                        {user_name}
                    </span>
                </p>
            </div>

        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
