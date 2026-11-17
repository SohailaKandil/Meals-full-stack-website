import { useState} from 'react'
import { Card } from '../components/card.jsx'
import Search_bar from '../components/search_bar.jsx'
import {URL_CARD , DATABASE_CARD} from '../APP_CONSTANTS'

export default function Home() {
    const [database_meals , set_database_meals] = useState([])
    const [url_Meals, set_url_meals] = useState([])
    const [page_number , set_page_number] = useState(1)
    const [max_page_number , set_max_page_number] = useState(1)

    return (
        <section className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
            <div className="mb-8">
            <Search_bar
                url_meals_func = {set_url_meals}
                database_meals_func = {set_database_meals}
                page_number = {page_number}
                set_page_number = {set_page_number}
                max_page_func = {set_max_page_number}
            />
            </div>
            
            {database_meals.length > 0 || url_Meals.length > 0 ? (
                    <div className="mt-8 grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {database_meals.map((meal, mealIndex) => (
                            <Card
                                key={`database-${mealIndex}`}
                                meal={meal}
                                type={DATABASE_CARD}
                                image={meal.image_url}
                                name={meal.recipe_name}
                                description={meal.nationality}
                            />
                        ))}
                        {url_Meals.map((meal, mealIndex) => (
                            <Card
                                key={`url-${mealIndex}`}
                                meal={meal}
                                type={URL_CARD}
                                image={meal.strMealThumb}
                                name={meal.strMeal}
                                description={meal.strArea}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="py-12 text-center text-sm text-stone-600">
                        we can't find any meals matching your search.
                    </p>
                )
            }

            {url_Meals.length + database_meals.length > 0 && (
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
