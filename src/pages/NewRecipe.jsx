import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewRecipe({ onAddRecipe }) {
  const [formState, setFormState] = useState({
    title: '',
    hook: '',
    ingredients: '',
    steps: '',
    tags: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormState((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formState.title.trim() || !formState.hook.trim()) {
      alert('Title and hook are required.');
      return;
    }

    const newRecipe = {
      id: Date.now().toString(),
      title: formState.title,
      hook: formState.hook,
      tags: formState.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
      author: 'You',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&w=1200&q=80',
      ingredients: formState.ingredients
        .split('\n')
        .map((line) => {
          const [item, qty] = line.split('|').map((text) => text.trim());
          return item ? { item, qty: qty || '' } : null;
        })
        .filter(Boolean),
      steps: formState.steps.split('\n').map((step) => step.trim()).filter(Boolean),
    };

    onAddRecipe(newRecipe);
    navigate('/');
  };

  return (
    <section className="card-panel">
      <h2>Create a new recipe</h2>
      <form className="recipe-form" onSubmit={handleSubmit}>
        <label>
          Recipe title
          <input
            value={formState.title}
            onChange={(event) => handleInputChange('title', event.target.value)}
            placeholder="Sweet potato tacos"
          />
        </label>

        <label>
          Hook
          <textarea
            rows="3"
            value={formState.hook}
            onChange={(event) => handleInputChange('hook', event.target.value)}
            placeholder="A quick and cozy meal for busy weeknights."
          />
        </label>

        <label>
          Ingredients (one per line, optional quantity after |)
          <textarea
            rows="5"
            value={formState.ingredients}
            onChange={(event) => handleInputChange('ingredients', event.target.value)}
            placeholder="Rice noodles | 200g\nCarrot | 1 shredded"
          />
        </label>

        <label>
          Steps (one per line)
          <textarea
            rows="5"
            value={formState.steps}
            onChange={(event) => handleInputChange('steps', event.target.value)}
            placeholder="Cook noodles until tender.\nToss with sauce."
          />
        </label>

        <label>
          Tags (comma separated)
          <input
            value={formState.tags}
            onChange={(event) => handleInputChange('tags', event.target.value)}
            placeholder="Dinner, Quick"
          />
        </label>

        <div className="form-actions">
          <button type="submit" className="primary-button">
            Save Recipe
          </button>
          <button type="button" className="secondary-button" onClick={() => navigate('/') }>
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
}
