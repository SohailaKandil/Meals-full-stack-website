import { useRef , useState } from "react"
import { useNavigate } from "react-router-dom"
import Axios_client from "../axios_client"
import { use_auth } from "../safe_routes/context_provider"
import { ADMIN, USER } from "../safe_routes/CONSTANTS.jsx"


export default function Login() {
  const email = useRef()
  const password = useRef()
  const navigate = useNavigate()

  const {set_user_name,set_token,set_role} = use_auth()
  const [err_message, set_err_message] = useState("")

  function on_submit(event){
    event.preventDefault()
    set_err_message("")
    const params = {
      "email" : email.current.value,
      "password" : password.current.value
    }

    Axios_client.post('/login',params).then(
      ({data})=>{
        set_user_name(data.user_name)
        set_token(data.token)
        set_role(data.is_admin? ADMIN : USER)
        navigate("/")
      }
    ).catch(
      (err) =>{
        const response = err.response
        const validationMessages = Object.values(response?.data?.errors ?? {}).flat()
        const message = response?.status === 401
          ? response.data?.message ?? "The email or password is incorrect."
          : validationMessages[0] ??
            (response
              ? "We couldn't sign you in. Please check your details and try again."
              : "Unable to connect. Check your internet connection and try again.")

        set_err_message(message)
      }
    )
    
  }

  return (
      <section className="flex min-h-[calc(100vh-4.25rem)] items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-md rounded-3xl bg-white p-7 shadow-[0_20px_60px_-32px_rgba(28,38,25,0.35)] ring-1 ring-black/5 sm:p-10">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-800">
              Welcome back
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900">
              Sign in to your account
            </h1>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              Sign in to save your favorite recipes and discover something delicious.
            </p>
          </div>

          {err_message && (
            <div
              role="alert"
              className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
            >
              <p className="font-semibold">We couldn&apos;t sign you in</p>
              <p className="mt-1 leading-5">{err_message}</p>
            </div>
          )}

          <form onSubmit = {on_submit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-stone-700"
              >
                Email address
              </label>
              <input
                ref={email}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-stone-700"
                >
                  Password
                </label>
              </div>
              <input
                ref={password}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="Enter your password"
                className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
            >
              Sign in
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-stone-600">
            Don&apos;t have an account?{' '}
            <a
              href="/signup"
              className="font-semibold text-emerald-800 hover:text-emerald-950"
            >
              Sign up
            </a>
          </p>
        </div>
      </section>
  )
}
