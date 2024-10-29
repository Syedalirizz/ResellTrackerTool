import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import InventoryPage from './pages/InventoryPage';

function App() {
  const { user, loading } = useAuthStore();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/inventory" element={<InventoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;