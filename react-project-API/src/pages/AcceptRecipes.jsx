import { useState } from 'react'
import DetailsCard from '../components/details_card.jsx'

const sampleRecipes = [
  {
    id: 'moroccan-chickpea-salad',
    meal: {
      name: 'Moroccan Chickpea Salad',
      area: 'Moroccan',
      category: 'Lunch',
      image:
        'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=85',
      ingredients: [
        { name: 'Chickpeas' },
        { name: 'Cherry tomatoes' },
        { name: 'Cucumber' },
        { name: 'Lemon juice' },
        { name: 'Olive oil' },
      ],
      instructions:
        'Rinse and drain the chickpeas. Add them to a bowl with the tomatoes and cucumber. Mix lemon juice with olive oil, pour over the salad, and toss gently.',
    },
  },
  {
    id: 'italian-tomato-pasta',
    meal: {
      name: 'Italian Tomato Pasta',
      area: 'Italian',
      category: 'Dinner',
      image:
        'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85',
      ingredients: [
        { name: 'Pasta' },
        { name: 'Cherry tomatoes' },
        { name: 'Garlic' },
        { name: 'Olive oil' },
        { name: 'Fresh basil' },
      ],
      instructions:
        'Cook the pasta in salted boiling water. Warm olive oil in a pan and cook the garlic and tomatoes until soft. Toss the sauce with the pasta and finish with fresh basil.',
    },
  },
  {
    id: 'indian-lentil-curry',
    meal: {
      name: 'Indian Lentil Curry',
      area: 'Indian',
      category: 'Dinner',
      image:
        'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=85',
      ingredients: [
        { name: 'Red lentils' },
        { name: 'Coconut milk' },
        { name: 'Onion' },
        { name: 'Curry powder' },
        { name: 'Vegetable broth' },
      ],
      instructions:
        'Cook the onion with curry powder until fragrant. Add the lentils, coconut milk, and broth. Simmer gently until the lentils are soft, stirring occasionally.',
    },
  },
  {
    id: 'vegetable-soup',
    meal: {
      name: 'Garden Vegetable Soup',
      area: 'Mediterranean',
      category: 'Soup',
      image:
        'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85',
      ingredients: [
        { name: 'Carrots' },
        { name: 'Potatoes' },
        { name: 'Vegetable broth' },
        { name: 'White beans' },
        { name: 'Fresh parsley' },
      ],
      instructions:
        'Chop the carrots and potatoes. Simmer them in vegetable broth until tender, then add the white beans. Season to taste and serve with fresh parsley.',
    },
  },
]

export default function AcceptRecipes() {
  const [recipes, setRecipes] = useState(sampleRecipes)

  function removeRecipe(recipeId) {
    setRecipes((currentRecipes) =>
      currentRecipes.filter(({ id }) => id !== recipeId),
    )
  }

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

      <div className="space-y-6">
        {recipes.length > 0 ? (
          recipes.map(({ id, meal }) => (
            <div
              className="flex flex-col items-center gap-5 rounded-3xl bg-white/70 p-4 shadow-sm ring-1 ring-black/5 sm:flex-row sm:justify-between sm:p-6"
              key={id}
            >
              <DetailsCard sampleMeal={meal} />

              <div className="flex w-full gap-3 sm:w-44 sm:shrink-0 sm:flex-col">
                <button
                  aria-label={`Accept ${meal.name}`}
                  className="inline-flex flex-1 items-center justify-center rounded-xl bg-emerald-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
                  onClick={() => removeRecipe(id)}
                  type="button"
                >
                  Accept
                </button>
                <button
                  aria-label={`Reject ${meal.name}`}
                  className="inline-flex flex-1 items-center justify-center rounded-xl border border-red-200 bg-white px-5 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                  onClick={() => removeRecipe(id)}
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
    </section>
  )
}
