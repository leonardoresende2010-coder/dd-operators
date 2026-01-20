import { useAuth } from '../context/AuthContext';

export default function Header() {
    const { user, logout } = useAuth();
    return (
        <header className="header">
            <div className="header-content">
                <div className="header-logo">
                    <div className="header-logo-icon">DD</div>
                    <span className="header-logo-text">Due Diligence</span>
                </div>
                <nav className="header-nav">
                    <div className="header-user">
                        <div className="header-avatar">{user?.nome_empresa?.charAt(0).toUpperCase() || 'U'}</div>
                        <div>
                            <div className="header-user-name">{user?.nome_empresa || 'Usuário'}</div>
                            <div className="header-user-role">{user?.is_admin ? 'Admin' : 'Operador'}</div>
                        </div>
                    </div>
                    <button className="btn btn-ghost" onClick={logout}>Sair</button>
                </nav>
            </div>
        </header>
    );
}
