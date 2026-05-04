import { AppProvider, useApp } from './context/AppContext';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import SalesDashboard from './components/SalesDashboard';

function AppContent() {
  const { user } = useApp();

  if (!user) return <Login />;

  if (user.role === 'admin') return <AdminDashboard />;

  return <SalesDashboard />;
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
