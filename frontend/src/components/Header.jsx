import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
    const { user, logout } = useAuth();
    const { language, setLanguage, t } = useLanguage();

    return (
        <header className="header">
            <div className="header-content">
                <div className="header-logo">
                    <div className="header-logo-icon">DD</div>
                    <span className="header-logo-text">{t('header.title')}</span>
                </div>
                <nav className="header-nav">
                    {/* Language Buttons */}
                    <div className="lang-switcher">
                        <button
                            className={`lang-btn ${language === 'pt-BR' ? 'active' : ''}`}
                            onClick={() => setLanguage('pt-BR')}
                        >
                            🇧🇷 Português
                        </button>
                        <button
                            className={`lang-btn ${language === 'en-US' ? 'active' : ''}`}
                            onClick={() => setLanguage('en-US')}
                        >
                            🇺🇸 English
                        </button>
                    </div>

                    <div className="header-user">
                        <div className="header-avatar">{user?.nome_empresa?.charAt(0).toUpperCase() || 'U'}</div>
                        <div>
                            <div className="header-user-name">{user?.nome_empresa || 'User'}</div>
                            <div className="header-user-role">{user?.is_admin ? 'Admin' : t('header.questionnaire')}</div>
                        </div>
                    </div>
                    <button className="btn btn-ghost" onClick={logout}>{t('header.logout')}</button>
                </nav>
            </div>
        </header>
    );
}
