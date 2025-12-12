import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const requestBody = isLogin 
        ? { email, password }
        : { name, email, password };
      
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Authentication failed');
        return;
      }

      // Store auth token and user info
      if (data.data && data.data.token) {
        localStorage.setItem('token', data.data.token);
        // Store user data with userId for API calls
        const userData = {
          userId: data.data.userId,
          email: data.data.email,
          name: data.data.name,
          token: data.data.token
        };
        localStorage.setItem('user', JSON.stringify(userData));
        // Dispatch event to trigger auth change
        window.dispatchEvent(new Event('authChanged'));
        navigate('/dashboard');
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      setError(err.message || 'Connection failed. Make sure backend is running on port 8080');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>{isLogin ? 'Login' : 'Register'}</h1>
          <p>{isLogin ? 'Welcome back!' : 'Create your account'}</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                required={!isLogin}
                minLength={2}
                maxLength={100}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Loading...' : isLogin ? 'Login' : 'Register'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              className="toggle-button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
                setName('');
              }}
            >
              {isLogin ? 'Register' : 'Login'}
            </button>
          </p>
        </div>

        <div className="demo-credentials">
          <p className="demo-title">Demo Credentials:</p>
          <p>Email: admin@example.com</p>
          <p>Password: Welcome1!</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
