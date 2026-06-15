import { useMemo, useState } from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Feed from './pages/Feed.jsx';
import NewRecipe from './pages/NewRecipe.jsx';
import ShoppingList from './pages/ShoppingList.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';
import DateNightCookOff from './pages/DateNightCookOff.jsx';

const sampleRecipes = [
  {
    id: '1',
    title: 'Spicy Thai Peanut Noodles',
    hook: 'Fast, creamy noodles with toasted peanuts and crisp veggies.',
    tags: ['Asian', 'Quick'],
    author: 'Mina',
    image:
      'https://images.unsplash.com/photo-1512058564366-c9e0b9c04f46?auto=format&w=1200&q=80',
    ingredients: [
      { item: 'Rice noodles', qty: '200g' },
      { item: 'Peanut butter', qty: '3 tbsp' },
      { item: 'Soy sauce', qty: '2 tbsp' },
      { item: 'Lime juice', qty: '1 tbsp' },
      { item: 'Carrot', qty: '1 shredded' },
    ],
    steps: [
      'Cook noodles until tender and drain.',
      'Whisk peanut butter, soy sauce, honey and lime juice.',
      'Toss noodles with sauce and vegetables.',
      'Garnish with peanuts and fresh cilantro.',
    ],
  },
  {
    id: '2',
    title: 'Sheet Pan Lemon Herb Chicken',
    hook: 'Easy one-pan dinner with bright lemon and crispy vegetables.',
    tags: ['Dinner', 'Family'],
    author: 'Noah',
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&w=1200&q=80',
    ingredients: [
      { item: 'Chicken thighs', qty: '4' },
      { item: 'Baby potatoes', qty: '500g' },
      { item: 'Lemon', qty: '1 sliced' },
      { item: 'Rosemary', qty: '2 sprigs' },
      { item: 'Olive oil', qty: '2 tbsp' },
    ],
    steps: [
      'Preheat oven to 200°C (400°F).',
      'Toss potatoes, chicken, lemon and herbs with oil.',
      'Bake until chicken is golden and potatoes are tender.',
      'Serve warm with pan juices spooned over top.',
    ],
  },
];

const pageNames = {
  '/': 'Feed',
  '/date-night': 'Date Night',
  '/new': 'New Recipe',
  '/shopping': 'Shopping',
  '/profile': 'Profile',
  '/login': 'Login',
};

const tabLinks = [
  { path: '/', label: 'Feed' },
  { path: '/date-night', label: 'Date' },
  { path: '/shopping', label: 'Shopping' },
  { path: '/new', label: 'New' },
  { path: '/profile', label: 'Profile' },
];

function App() {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [recipes, setRecipes] = useState(sampleRecipes);
  const [shoppingList, setShoppingList] = useState([]);

  const pageTitle = pageNames[location.pathname] || 'Lets Cook';

  const featuredRecipe = useMemo(() => recipes[0], [recipes]);

  const addToShoppingList = (recipe) => {
    const newItems = recipe.ingredients.map((ingredient) => ingredient.item);
    setShoppingList((current) => [
      ...current,
      ...newItems.filter((item) => !current.includes(item)),
    ]);
  };

  const addRecipe = (recipe) => {
    setRecipes((current) => [recipe, ...current]);
  };

  return (
    <div className={darkMode ? 'app theme-dark' : 'app'}>
      <header className="topbar">
        <div>
          <p className="eyebrow">Lets Cook</p>
          <h1>{pageTitle}</h1>
        </div>
        <div className="topbar-right">
          <button className="icon-button" onClick={() => setDarkMode((mode) => !mode)}>
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          {user ? (
            <button className="secondary-button" onClick={signOut}>
              Sign out
            </button>
          ) : (
            <NavLink to="/login" className="primary-button">
              Sign in
            </NavLink>
          )}
        </div>
      </header>

      <main className="content-shell">
        <Routes>
          <Route path="/" element={<Feed recipes={recipes} onAddToShoppingList={addToShoppingList} />} />
          <Route
            path="/date-night"
            element={
              <DateNightCookOff
                onAddToShoppingList={addToShoppingList}
                onAddRecipes={addRecipe}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/new"
            element={
              <ProtectedRoute>
                <NewRecipe onAddRecipe={addRecipe} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shopping"
            element={
              <ProtectedRoute>
                <ShoppingList initialItems={shoppingList} onChange={setShoppingList} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Feed recipes={recipes} onAddToShoppingList={addToShoppingList} />} />
        </Routes>
      </main>

      <footer className="bottom-tabs">
        {tabLinks.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) => (isActive ? 'tab-button active' : 'tab-button')}
          >
            {tab.label}
          </NavLink>
        ))}
      </footer>
    </div>
  );
}

export default App;
