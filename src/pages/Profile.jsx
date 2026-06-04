import { useAuth } from '../AuthContext';

export default function Profile() {
  const { user, signOut } = useAuth();

  return (
    <section className="card-panel profile-panel">
      <div className="profile-header">
        <div className="avatar">👩‍🍳</div>
        <div>
          <h2>{user?.email ? 'Welcome back' : 'Profile'}</h2>
          <p>{user?.email ?? 'Sign in to save recipes and access your shopping list.'}</p>
        </div>
      </div>

      <div className="profile-details">
        <p>
          <strong>User ID:</strong> {user?.id ?? 'Not signed in'}
        </p>
        <p>
          <strong>Email:</strong> {user?.email ?? 'No email available'}
        </p>
      </div>

      {user ? (
        <button className="primary-button" onClick={signOut}>
          Sign out
        </button>
      ) : (
        <p className="empty-state">Visit the login tab to sign in with your email.</p>
      )}
    </section>
  );
}
