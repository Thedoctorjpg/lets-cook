import { useEffect, useMemo, useState } from 'react';

export default function ShoppingList({ initialItems = [], onChange }) {
  const [items, setItems] = useState(initialItems);
  const [checked, setChecked] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  useEffect(() => {
    onChange?.(items);
  }, [items, onChange]);

  const totalItems = useMemo(() => items.length, [items]);
  const purchasedCount = useMemo(() => checked.filter((item) => items.includes(item)).length, [checked, items]);

  const handleAddItem = (event) => {
    event.preventDefault();
    const trimmed = newItem.trim();
    if (!trimmed) return;

    if (items.includes(trimmed)) {
      alert('This item is already on your list.');
      return;
    }

    setItems((current) => [...current, trimmed]);
    setNewItem('');
  };

  const handleRemove = (itemToRemove) => {
    setItems((current) => current.filter((item) => item !== itemToRemove));
    setChecked((current) => current.filter((item) => item !== itemToRemove));
  };

  const handleToggle = (item) => {
    setChecked((current) =>
      current.includes(item) ? current.filter((entry) => entry !== item) : [...current, item]
    );
  };

  const handleClearList = () => {
    if (!items.length) return;
    if (window.confirm('Clear your entire shopping list?')) {
      setItems([]);
      setChecked([]);
    }
  };

  return (
    <section className="card-panel">
      <div className="section-header">
        <div>
          <h2>Shopping list</h2>
          <p className="meta">{totalItems} item{totalItems === 1 ? '' : 's'} on the list</p>
        </div>
        <button className="secondary-button" onClick={handleClearList}>
          Clear list
        </button>
      </div>

      <form className="shopping-form" onSubmit={handleAddItem}>
        <input
          value={newItem}
          onChange={(event) => setNewItem(event.target.value)}
          placeholder="Add a new grocery item"
        />
        <button className="primary-button" type="submit">
          Add
        </button>
      </form>

      {items.length === 0 ? (
        <p className="empty-state">No items yet. Add ingredients from a recipe or type a shopping item.</p>
      ) : (
        <ul className="shopping-list">
          {items.map((item) => (
            <li key={item} className="shopping-item">
              <label className={checked.includes(item) ? 'purchased' : ''}>
                <input
                  type="checkbox"
                  checked={checked.includes(item)}
                  onChange={() => handleToggle(item)}
                />
                {item}
              </label>
              <button className="small-button" onClick={() => handleRemove(item)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="status-text">
        Purchased {purchasedCount} of {totalItems} items.
      </p>
    </section>
  );
}
