import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Store } from 'lucide-react';

export default function Login() {
  const { login } = useApp();
  const [adminLoading, setAdminLoading] = useState(false);
  const [salesLoading, setSalesLoading] = useState(false);
  const [error, setError] = useState('');

  const quickLogin = async (username: string, password: string, role: 'admin' | 'sales') => {
    setError('');
    role === 'admin' ? setAdminLoading(true) : setSalesLoading(true);
    
    try {
      const user = await login(username, password);
      if (!user) {
        setError('Invalid credentials. Check your Supabase table.');
      }
    } catch (err: any) {
      // This catches the 401 error and displays a helpful message
      setError(err.message || 'Login failed. Server might be unreachable.');
    } finally {
      role === 'admin' ? setAdminLoading(false) : setSalesLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-2xl mb-4">
            <Store className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">Shop Management</h1>
          <p className="text-blue-200/70 text-sm">POS System</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-8">
          <h2 className="text-xl font-semibold text-white mb-6">Continue As</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-400/30 rounded-lg text-red-200 text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={() => {
                const pwd = window.prompt('Enter admin password');
                if (pwd) quickLogin('admin', pwd, 'admin');
              }}
              disabled={adminLoading || salesLoading}
              className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:brightness-110 disabled:opacity-50 transition-all"
            >
              {adminLoading ? 'Verifying Admin...' : 'Continue as Admin'}
            </button>

            <button
              onClick={() => {
                const pwd = window.prompt('Enter sales password');
                if (pwd) quickLogin('sales', pwd, 'sales');
              }}
              disabled={adminLoading || salesLoading}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:brightness-110 disabled:opacity-50 transition-all"
            >
              {salesLoading ? 'Verifying Sales...' : 'Continue as Sales'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}