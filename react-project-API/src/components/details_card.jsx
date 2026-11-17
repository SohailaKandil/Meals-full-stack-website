export default function DetailsCard({meal}) {
  return (
    <article className="w-full max-w-sm overflow-hidden rounded-3xl bg-white shadow-[0_24px_70px_-34px_rgba(28,38,25,0.45)] ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_80px_-34px_rgba(28,38,25,0.5)]">
      <div className="relative">
        <img
          alt={meal.recipe_name}
          className="h-52 w-full object-cover"
          src={meal.image_url}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10"
        />
        <span className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-white/95 px-3 py-1.5 text-xs font-semibold text-emerald-950 shadow-sm">
          {meal.nationality}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-800">
              {meal.recipe_type} recipe
            </p>
            <h2 className="mt-1.5 text-xl font-bold leading-tight tracking-tight text-stone-900">
              {meal.recipe_name}
            </h2>
          </div>
          <span
            aria-hidden="true"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-emerald-50 text-lg text-emerald-800"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path
                d="M20 4c-9 0-15 4-15 11a5 5 0 0 0 5 5c7 0 11-6 10-16Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M6 18c3-4 6-7 11-10" strokeLinecap="round" />
            </svg>
          </span>
        </div>

        <details className="mt-5 border-t border-stone-100 pt-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800">
        
            <div className="mb-3 flex w-full items-center justify-between gap-5">
              <h3 className="text-sm font-semibold text-stone-900">Ingredients</h3>
              <span className="text-xs font-medium text-stone-500">
                {meal.ingredients.length} items
              </span>
              <span
                aria-hidden="true"
                className="grid h-7 w-7 place-items-center rounded-full bg-emerald-50 text-base"
              >
                +
              </span>
            </div>
          </summary>
          <ul className="grid grid-cols-2 gap-2">
            {meal.ingredients.map((ingredient , index) => (
              <li
                className="flex min-w-0 items-center gap-2 rounded-xl bg-stone-50 px-2.5 py-2 text-xs leading-4 text-stone-700"
                key={`${ingredient}-${index}`}
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-700"
                />
                <span className="truncate">{ingredient}</span>
              </li>
            ))}
          </ul>
        </details>


        <details className="mt-5 border-t border-stone-100 pt-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800">
            <span>Cooking instructions</span>
            <span
              aria-hidden="true"
              className="grid h-7 w-7 place-items-center rounded-full bg-emerald-50 text-base"
            >
              +
            </span>
          </summary>
          <div className="mt-4 space-y-3">
            {meal.instructions}
          </div>
        </details>

      </div>
    </article>
  )
}
