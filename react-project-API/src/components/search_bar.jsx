import { useState , useEffect} from 'react'
import Axios_client from '../axios_client'
import {URL_MEALS_PAGE_SIZE} from '../APP_CONSTANTS'

const meals_url = import.meta.env.VITE_MEALS_URL 

export default function Search_bar({url_meals_func , database_meals_func , page_number , set_page_number , max_page_func}) {
    const [searchTerm, setSearchTerm] = useState('')
    const [searched_url_meals, set_searched_url_meals] = useState([])
    const [is_searching, set_is_searching] = useState(false)

    const [all_url_meals, set_all_url_meals] = useState([])

    const [database_pages, set_database_pages] = useState(0)
    const [all_url_pages, set_all_url_pages] = useState(0)
    const [search_url_pages, set_search_url_pages] = useState(0)

    const fetch_all_url_meals = () => {
        fetch(meals_url)
        .then((response) => response.json())
        .then((data) => {
            const meals = data.meals || []
            set_all_url_pages(meals.length/URL_MEALS_PAGE_SIZE)
            set_all_url_meals(meals || [])
        })
    }

    const fetch_page_url_meals = () => {
        const start = (page_number - 1) * URL_MEALS_PAGE_SIZE
        const final_meals = all_url_meals.slice(start, start + URL_MEALS_PAGE_SIZE)
        url_meals_func(final_meals || [])
    }

    const fetch_all_url_search_meals = (search) => {
        if (search == ""){
            set_searched_url_meals([])
            set_is_searching(false)
        }else{
            const url = `${meals_url}${encodeURIComponent(search)}`
            fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const meals = data.meals || []
                set_search_url_pages(meals.length/URL_MEALS_PAGE_SIZE)
                set_searched_url_meals(meals)
            })
        }
    }

    const fetch_page_url_search_meals = () => {
        const start = (page_number - 1) * URL_MEALS_PAGE_SIZE
        const final_meals = searched_url_meals.slice(start, start + URL_MEALS_PAGE_SIZE)
        url_meals_func(final_meals || [])  
    }

    const fetch_url_meals = (search) => {
        if (is_searching){
            fetch_page_url_search_meals()
        }
        else{
            fetch_page_url_meals()
        }
    }

    const fetch_database_meals = (st = searchTerm, page = page_number) => {
        Axios_client.get("/get_non_pending_recipes",
            {params : {page: page , search: st}}).
            then(
                ({data})=>{
                    set_database_pages(data.data.length / data.meta.per_page)
                    database_meals_func(data.data)
                }
            ).catch(
                ()=>{
                    console.log("there is an error fetching the meals")
                }
            )
    }

    useEffect(() => {
        setSearchTerm("")
        fetch_all_url_meals()
        fetch_database_meals()
        }, []
    )

    useEffect(() => {
        fetch_database_meals()
        }, [page_number]
    )

    useEffect(() => {
        //setSearchTerm("")
        fetch_url_meals()
        }, [all_url_meals , page_number , is_searching , searched_url_meals]
    )

    useEffect(() => {
        if (is_searching){
            max_page_func(Math.ceil(database_pages + search_url_pages))
        }
        else{
            max_page_func(Math.ceil(database_pages + all_url_pages))
        }
    }, [database_pages, all_url_pages , search_url_pages , is_searching])

    const handle_search_change = (event) => {
        const nextSearchTerm = event.target.value
        setSearchTerm(nextSearchTerm)

        if (nextSearchTerm.trim() === '') {
            set_is_searching(false)
            url_meals_func(all_url_meals)
            set_page_number(1)

            setSearchTerm("")
            fetch_database_meals("", 1)
        }
    }

    const handle_submit_change = (event) => {
        event.preventDefault()
        const query = event.target.querySelector('#meal-search').value
        const normalized_query = query.trim().toLowerCase()

        set_page_number(1)
        set_is_searching(true)
        fetch_all_url_search_meals(normalized_query)
        fetch_database_meals(normalized_query, 1)
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
                onChange={handle_search_change}
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