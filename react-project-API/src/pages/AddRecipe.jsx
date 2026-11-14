import { useState } from 'react'

const fieldClassName =
  'w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/10'

const labelClassName = 'mb-2 block text-sm font-medium text-stone-700'

export default function AddRecipe() {
  const [ingredients, setIngredients] = useState([''])


  function updateIngredient(index, value) {
    setIngredients((currentIngredients) =>
      currentIngredients.map((ingredient, ingredientIndex) =>
        ingredientIndex === index ? value : ingredient,
      ),
    )
  }

  function addIngredient() {
    setIngredients((currentIngredients) => [...currentIngredients, ''])
  }

  function removeIngredient(index) {
    setIngredients((currentIngredients) =>
      currentIngredients.filter((_, ingredientIndex) => ingredientIndex !== index),
    )
  }

  function handleSubmit(event) {
    event.preventDefault()
  }



  return (
    <section className="mx-auto w-full max-w-4xl px-5 py-8 sm:px-8 sm:py-12">
      <div className="overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_-32px_rgba(28,38,25,0.35)] ring-1 ring-black/5">
        <header className="border-b border-stone-100 bg-gradient-to-br from-emerald-50 to-white px-6 py-8 sm:px-10 sm:py-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-800">
            Recipes Around The World
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            Add a recipe
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
            Share a favorite from your kitchen. Add the details and list each ingredient on its own line.
          </p>
        </header>

        <form className="space-y-8 p-6 sm:p-10" onSubmit={handleSubmit}>
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className={labelClassName} htmlFor="recipe-name">
                Recipe name
              </label>
              <input
                className={fieldClassName}
                id="recipe-name"
                name="recipeName"
                type="text"
                placeholder="e.g. Vegetable tagine"
                autoComplete="off"
                required
              />
            </div>

            <div>
              <label className={labelClassName} htmlFor="nationality">
                Nationality or cuisine
              </label>
              <input
                className={fieldClassName}
                id="nationality"
                name="nationality"
                type="text"
                placeholder="e.g. Moroccan"
                autoComplete="off"
                required
              />
            </div>

            <div className="sm:col-span-2">
              <label className={labelClassName} htmlFor="recipe-type">
                Type of recipe
              </label>
              <select
                className={fieldClassName}
                id="recipe-type"
                name="recipeType"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Choose a type
                </option>
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="appetizer">Appetizer</option>
                <option value="dessert">Dessert</option>
                <option value="snack">Snack</option>
                <option value="drink">Drink</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className={labelClassName} htmlFor="recipe-image">
                Recipe image URL
              </label>
              <input
                className={fieldClassName}
                id="recipe-image"
                name="recipeImage"
                type="url"
                placeholder="https://example.com/recipe-photo.jpg"
              />
            </div>
          </div>

          <section aria-labelledby="ingredients-heading">
            <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2
                  className="text-lg font-semibold text-stone-900"
                  id="ingredients-heading"
                >
                  Ingredients
                </h2>
                <p className="mt-1 text-sm text-stone-500">
                  Add one ingredient per bullet point.
                </p>
              </div>
              <button
                className="rounded-lg px-3 py-2 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800"
                onClick={addIngredient}
                type="button"
              >
                + Add ingredient
              </button>
            </div>

            <ul className="space-y-3">
              {ingredients.map((ingredient, index) => (
                <li className="flex items-center gap-3" key={index}>
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 shrink-0 rounded-full bg-emerald-700"
                  />
                  <input
                    aria-label={`Ingredient ${index + 1}`}
                    className={fieldClassName}
                    name="ingredients[]"
                    onChange={(event) => updateIngredient(index, event.target.value)}
                    placeholder={`Ingredient ${index + 1}, e.g. 2 cups of rice`}
                    required
                    type="text"
                    value={ingredient}
                  />
                  {ingredients.length > 1 && (
                    <button
                      aria-label={`Remove ingredient ${index + 1}`}
                      className="shrink-0 rounded-lg px-3 py-2 text-sm font-medium text-stone-500 transition hover:bg-red-50 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700"
                      onClick={() => removeIngredient(index)}
                      type="button"
                    >
                      Remove
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <div>
            <label className={labelClassName} htmlFor="instructions">
              How to make the recipe
            </label>
            <textarea
              className={`${fieldClassName} min-h-44 resize-y leading-6`}
              id="instructions"
              name="instructions"
              placeholder="Write the steps in order, one step at a time..."
              required
              rows={7}
            />
          </div>

          <div className="border-t border-stone-100 pt-6">
            <button
              className="w-full rounded-xl bg-emerald-800 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-800 sm:w-auto"
              type="submit"
            >
              Submit Recipe
            </button>

          </div>
        </form>
      </div>
    </section>
  )
}
