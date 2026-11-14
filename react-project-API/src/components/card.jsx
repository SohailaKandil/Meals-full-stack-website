import { Link } from 'react-router-dom'

export function Card({meal , image , name , description}) {
    return(
      <Link
        to="/Ingredients"
        state = {meal}
        >
      
        <article className="hover:scale-102 hover:not-focus:bg-gray-200 w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-[0_20px_60px_-32px_rgba(28,38,25,0.35)] ring-1 ring-black/5">
          <img
            className="aspect-4/3 w-full object-cover"
            src={image}
            alt="Colorful bowl of fresh greens, vegetables, and avocado"
          />
          <div className="p-6 sm:p-7">
            <h2 className="text-2xl font-semibold tracking-tight">
              {name}
            </h2>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              {description}
            </p>

          </div>
        </article>
      </Link>
    )
}