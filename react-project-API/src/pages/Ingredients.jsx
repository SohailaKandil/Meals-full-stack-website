import { useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import {URL_CARD , DATABASE_CARD} from '../APP_CONSTANTS'

export default function Ingredients() {
  const {meal , type} = useLocation().state
  let recipe_ingredients = []
  let image = ''
  let nationality = ''
  let recipe_type = ''
  let recipe_name = ''
  let instructions = ''

  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!meal) {
    return <Navigate to="/" replace />
  }

  if (type == URL_CARD){
    recipe_ingredients = Array.from({ length: 20 }, (_, index) => {
        const number = index + 1
        return meal[`strIngredient${number}`]?.trim()
    }).filter(Boolean)

    image = meal.strMealThumb
    nationality = meal.strArea
    recipe_type = meal.strCategory
    recipe_name = meal.strMeal
    instructions = meal.strInstructions
  }

  else if (type == DATABASE_CARD){
    console.log("a database card")
    recipe_ingredients = meal.ingredients
    image = meal.image_url
    nationality = meal.nationality
    recipe_type = meal.recipe_type
    recipe_name = meal.recipe_name
    instructions = meal.instructions
  }


  
  return (
      <article className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_-32px_rgba(28,38,25,0.35)] ring-1 ring-black/5">
          <div className="relative">
            <img
              src={image}
              className="h-64 w-full object-cover sm:h-96"
            />
            {nationality && (
              <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-4 py-2 text-sm font-medium text-emerald-900 shadow-sm">
                {nationality}
              </span>
            )
            }
          </div>

          <div className="p-6 sm:p-10">
            <header className="border-b border-stone-200 pb-6">
              <p className="text-sm font-semibold uppercase tracking-widest text-emerald-800">
                A simple homemade {recipe_type} recipe
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
                {recipe_name}
              </h1>
            </header>

            <div className="grid gap-10 pt-8 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
              <section aria-labelledby="ingredients-heading">
                <h2
                  id="ingredients-heading"
                  className="text-2xl font-semibold text-stone-900"
                >
                  Ingredients
                </h2>
                <ul className="mt-5 divide-y divide-stone-100">
                  {recipe_ingredients.map((ingredient , index) => (
                    <li
                      key={index}
                      className="flex items-start justify-between gap-4 py-3 text-sm"
                    >
                      <span className="text-stone-700">{ingredient}</span>
                      
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="instructions-heading">
                <h2
                  id="instructions-heading"
                  className="text-2xl font-semibold text-stone-900"
                >
                  How to make it
                </h2>
                <p className="mt-5 text-sm leading-7 text-stone-600">
                  {instructions}
                </p>
              </section>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            className="mb-5 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-emerald-900 shadow-sm ring-1 ring-black/5 transition hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
            onClick={() => navigate(-1)}
          >
            <span aria-hidden="true">&larr;</span>
            Back
          </button>
        </div>
      </article>
  )
}
