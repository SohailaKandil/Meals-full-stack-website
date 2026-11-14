import { useState} from 'react'
import { Card } from '../components/card.jsx'
import Search_bar from '../components/search_bar.jsx'

export default function Home() {
    const [filteredMeals, setFilteredMeals] = useState([])
  
    return (
        <section className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
            <div className="mb-8">
            <Search_bar
                filtered_meals_func = {setFilteredMeals}
            />
            </div>
            
            {filteredMeals.length > 0 ? (
                    <div className="mt-8 grid grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {filteredMeals.map((meal, mealIndex) => (
                            <Card
                                key={mealIndex}
                                meal={meal}
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
                )}
        </section>
    )
}
