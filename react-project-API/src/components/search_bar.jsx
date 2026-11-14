import { useState , useEffect} from 'react'
const meals_url = import.meta.env.VITE_MEALS_URL

export default function Search_bar({filtered_meals_func}) {
    const [searchTerm, setSearchTerm] = useState('')
    const [allMeals, setAllMeals] = useState([])

    // display all the meals at the begining
    const fetch_request = (search , initialize) => {
        const url = `${meals_url}${encodeURIComponent(search)}`
        fetch(url)
        .then((response) => response.json())
        .then((data) => {filtered_meals_func(data.meals || [])
            if (initialize) {
            setAllMeals(data.meals || [])
            }
        })
    }
    useEffect(() => {
        fetch_request('' , true)
        }, []
    )

    const handleSearchChange = (event) => {
        const nextSearchTerm = event.target.value
        setSearchTerm(nextSearchTerm)

        if (nextSearchTerm.trim() === '') {
            filtered_meals_func(allMeals)
        }
    }

    const handle_submit_change = (event) => {
        event.preventDefault()
        const query = event.target.querySelector('#meal-search').value
        const normalized_query = query.trim().toLowerCase()

        fetch_request(normalized_query , false)
    }
    return (
        <form
            role="search"
            onSubmit={handle_submit_change}
            className="mx-auto flex w-full max-w-2xl items-center gap-2 rounded-xl border border-stone-200 bg-white p-2 shadow-sm focus-within:ring-2 focus-within:ring-emerald-700/30"
        >
            <label htmlFor="meal-search" className="sr-only">
                Search meals
            </label>
            <input
                //ref={inputRef}
                id="meal-search"
                type="search"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search meals"
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-stone-900 outline-none placeholder:text-stone-500"
            />
            <button
                type="submit"
                className="hover:scale-102 shrink-0 rounded-lg bg-emerald-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
            >
                Search
            </button>
        </form>
    )
}