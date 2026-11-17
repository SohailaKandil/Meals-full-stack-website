import { useEffect, useState } from 'react'
import DetailsCard from '../components/details_card.jsx'
import Axios_client from '../axios_client.js'


export default function AcceptRecipes() {
  const [recipes, setRecipes] = useState([])
  const [page_number , set_page_number] = useState(1)
  const [max_page_number , set_max_page_number] = useState(1)
  const [err_message, set_err_message] = useState("")

  function fetch_pending_recipes (){
    Axios_client.get("/get_pending_recipes" , {params : {page: page_number}})
    .then(
      ({data})=>{
        setRecipes(data.data)
        set_max_page_number(data.meta.last_page)
      }
    )
    .catch(
      (error)=>{
        set_err_message(error.response?.data?.message ?? error.message)
      }
    )
  }


  function handle_accept(recipeId){
    Axios_client.patch("/accept_recipe" , { recipe_id: recipeId})
    .then(
      ()=>{
        fetch_pending_recipes ()
      }
    )
    .catch(
      ()=>{
        set_err_message("There has been an error accepting this recipe")
      }
    )
  }

  function handle_reject(recipeId){
    Axios_client.delete("/reject_recipe" , {params: {recipe_id: recipeId}})
    .then(
      ()=>{
        fetch_pending_recipes ()
      }
    )
    .catch(
      ()=>{
        set_err_message("There has been an error rejecting this recipe")
      }
    )
  }

  useEffect(
    ()=>{
      set_err_message("")
      fetch_pending_recipes()
    },[page_number]
  )

  return (
    <section className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
      <header className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-800">
          Recipe review
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
          Accept recipes
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
          Review each sample recipe and accept the ones you would like to
          approve.
        </p>
      </header>

      {err_message && (
        <div
          role="alert"
          className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {err_message}
        </div>
      )}

      <div className="space-y-6">
        {recipes.length > 0 ? (
          recipes.map((meal) => (
            <div
              className="flex flex-col items-center gap-5 rounded-3xl bg-white/70 p-4 shadow-sm ring-1 ring-black/5 sm:flex-row sm:justify-between sm:p-6"
              key={meal.recipe_id}
            >
              <DetailsCard meal={meal} />

              <div className="flex w-full gap-3 sm:w-44 sm:shrink-0 sm:flex-col">
                <button
                  aria-label={`Accept ${meal.recipe_name}`}
                  className="inline-flex flex-1 items-center justify-center rounded-xl bg-emerald-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
                  onClick={() => handle_accept(meal.recipe_id)}
                  type="button"
                >
                  Accept
                </button>
                <button
                  aria-label={`Reject ${meal.name}`}
                  className="inline-flex flex-1 items-center justify-center rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                  onClick={() => handle_reject(meal.recipe_id)}
                  type="button"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        ) : (
          <p
            className="rounded-2xl bg-white px-5 py-8 text-center text-sm font-medium text-stone-600 shadow-sm"
            role="status"
          >
            All recipes have been reviewed.
          </p>
        )}
      </div>

      {recipes.length > 0 && (
                <nav aria-label="Meal pages" className="mt-8 flex items-center justify-center gap-4">
                    <button
                        type="button"
                        onClick={() => set_page_number((currentPage) => Math.max(1, currentPage - 1))}
                        disabled={page_number == 1}
                        className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition-all duration-200 enabled:hover:-translate-y-0.5 enabled:hover:border-emerald-800 enabled:hover:bg-emerald-800 enabled:hover:text-white enabled:hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
                    >
                        Previous
                    </button>
                    <span aria-live="polite" className="text-sm text-stone-600">
                        Page {page_number}
                    </span>
                    <button
                        type="button"
                        onClick={() => set_page_number((currentPage) => currentPage + 1)}
                        disabled={page_number >= max_page_number}
                        className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition-all duration-200 enabled:hover:-translate-y-0.5 enabled:hover:border-emerald-800 enabled:hover:bg-emerald-800 enabled:hover:text-white enabled:hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
                    >
                        Next
                    </button>
                </nav>
      )}
    </section>
  )
}
