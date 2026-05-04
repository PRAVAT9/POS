import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Store } from 'lucide-react';

export default function Login() {
  const { login } = useApp();
  const [adminLoading, setAdminLoading] = useState(false);
  const [salesLoading, setSalesLoading] = useState(false);
  const [error, setError] = useState('');

  const handleQuickEntry = async (role: 'admin' | 'sales') => {
    setError('');
    role === 'admin' ? setAdminLoading(true) : setSalesLoading(true);
    
    try {
      // Automatically sends 'admin' or 'sales' as both username and password
      const user = await login(role, role);
      if (!user) {
        setError('Login failed. Ensure users exist in your Supabase table.');
      }
    } catch (err: any) {
      setError(err.message || 'Server connection error.');
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
          <h2 className="text-xl font-semibold text-white mb-6 text-center">Quick Access</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-400/30 rounded-lg text-red-200 text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <button
              onClick={() => handleQuickEntry('admin')}
              disabled={adminLoading || salesLoading}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all"
            >
              {adminLoading ? 'Entering Dashboard...' : 'Continue as Admin'}
            </button>

            <button
              onClick={() => handleQuickEntry('sales')}
              disabled={adminLoading || salesLoading}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all"
            >
              {salesLoading ? 'Opening Sales App...' : 'Continue as Sales'}
            </button>
          </div>
          
          <p className="mt-6 text-center text-xs text-blue-200/40">
            One-tap access enabled for authorized devices.
          </p>
        </div>
      </div>
    </div>
  );
}