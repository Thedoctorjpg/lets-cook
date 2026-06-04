import { useMemo, useState } from 'react';

export default function Feed({ recipes, onAddToShoppingList }) {
  const [expandedId, setExpandedId] = useState(null);
  const featuredRecipe = useMemo(() => recipes[0], [recipes]);

  const toggleExpand = (id) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <section className="page-grid">
      <article className="hero-card">
        <img src={featuredRecipe.image} alt={featuredRecipe.title} />
        <div className="hero-copy">
          <p className="tag">{featuredRecipe.tags[0] || 'Recipe'}</p>
          <h2>{featuredRecipe.title}</h2>
          <p>{featuredRecipe.hook}</p>
          <p className="meta">By {featuredRecipe.author}</p>
          <button className="secondary-button" onClick={() => onAddToShoppingList(featuredRecipe)}>
            Add Ingredients to List
          </button>
        </div>
      </article>

      <div className="recipe-list">
        {recipes.map((recipe) => (
          <article key={recipe.id} className="recipe-card">
            <div className="recipe-card-header">
              <div>
                <p className="chip">{recipe.tags[0] || 'Recipe'}</p>
                <h3>{recipe.title}</h3>
                <p className="meta">By {recipe.author}</p>
              </div>
              <button className="small-button" onClick={() => toggleExpand(recipe.id)}>
                {expandedId === recipe.id ? 'Hide' : 'Expand'}
              </button>
            </div>

            <p>{recipe.hook}</p>
            {expandedId === recipe.id && (
              <div className="recipe-details">
                <div>
                  <h4>Ingredients</h4>
                  <ul>
                    {recipe.ingredients.map((ingredient) => (
                      <li key={ingredient.item}>
                        {ingredient.item}
                        {ingredient.qty ? ` — ${ingredient.qty}` : ''}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4>Steps</h4>
                  <ol>
                    {recipe.steps.map((step, index) => (
                      <li key={`${recipe.id}-${index}`}>{step}</li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            <div className="recipe-actions">
              <button className="secondary-button" onClick={() => onAddToShoppingList(recipe)}>
                Add to shopping list
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
