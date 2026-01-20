import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Questionario from './pages/Questionario';
import AdminDashboard from './pages/AdminDashboard';
import './index.css';

function AppContent() {
    const { user, loading } = useAuth();
    if (loading) return <div className="loading-overlay"><div className="loading-spinner"></div></div>;
    if (!user) return <Login />;
    if (user.is_admin) return <AdminDashboard />;
    return <Questionario />;
}

export default function App() {
    return <AuthProvider><AppContent /></AuthProvider>;
}
