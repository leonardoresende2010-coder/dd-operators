import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Header() {
    const { user, logout } = useAuth();
    const { language, toggleLanguage, t } = useLanguage();

    return (
        <header className="header">
            <div className="header-content">
                <div className="header-logo">
                    <div className="header-logo-icon">DD</div>
                    <span className="header-logo-text">{t('header.title')}</span>
                </div>
                <nav className="header-nav">
                    {/* Language Toggle */}
                    <button
                        className="btn btn-ghost lang-toggle"
                        onClick={toggleLanguage}
                        title={language === 'pt-BR' ? 'Switch to English' : 'Mudar para Português'}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 0.75rem',
                            borderRadius: '8px',
                            fontWeight: 600
                        }}
                    >
                        <span style={{ fontSize: '1.25rem' }}>{language === 'pt-BR' ? '🇧🇷' : '🇺🇸'}</span>
                        <span>{language === 'pt-BR' ? 'PT' : 'EN'}</span>
                    </button>

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
