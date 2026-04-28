import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/admin/login`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminUser', data.username);
        navigate('/admin/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-surface-container-low px-4">
      <div className="max-w-md w-full bg-white shadow-2xl border border-outline-variant p-8 lg:p-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-none mb-4">
            <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
          </div>
          <h1 className="font-headline-md text-headline-md text-primary uppercase tracking-tighter">Admin Portal</h1>
          <p className="text-on-surface-variant font-body-sm mt-2">Secure Access Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-error-container text-on-error-container p-4 border-l-4 border-error text-sm flex items-center gap-3">
              <span className="material-symbols-outlined">error</span>
              {error}
            </div>
          )}

          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-2 tracking-widest">Username</label>
            <input
              type="text"
              className="w-full bg-surface-container-low border-outline-variant focus:border-primary focus:ring-0 transition-colors py-3 px-4 font-body-md"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-label-sm text-label-sm text-on-surface-variant uppercase mb-2 tracking-widest">Password</label>
            <input
              type="password"
              className="w-full bg-surface-container-low border-outline-variant focus:border-primary focus:ring-0 transition-colors py-3 px-4 font-body-md"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 font-work-sans font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary text-white hover:bg-opacity-90 shadow-lg'
              }`}
          >
            {isLoading ? 'Authenticating...' : 'Login to Dashboard'}
            {!isLoading && <span className="material-symbols-outlined">login</span>}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-outline-variant text-center">
          <p className="text-xs text-on-surface-variant font-body-sm uppercase tracking-widest">
            Patel Engineering Portal &copy; 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
