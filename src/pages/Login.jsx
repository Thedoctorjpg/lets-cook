import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { user, signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.trim()) {
      setMessage('Enter a valid email to continue.');
      return;
    }

    const { error } = await signIn(email.trim());

    if (error) {
      setMessage(error.message || 'Unable to send login link.');
      return;
    }

    setMessage('Check your email for the login link.');
  };

  return (
    <section className="card-panel login-panel">
      <h2>Login</h2>
      <p className="meta">Enter your email and sign in with Supabase OTP.</p>
      <form className="recipe-form" onSubmit={handleSubmit}>
        <label>
          Email address
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
          />
        </label>

        <div className="form-actions">
          <button type="submit" className="primary-button">
            Send login link
          </button>
        </div>
        {message && <p className="status-text">{message}</p>}
      </form>
    </section>
  );
}
