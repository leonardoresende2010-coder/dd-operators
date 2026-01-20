import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

export default function Login() {
    const { login } = useAuth();
    const { language, setLanguage, t } = useLanguage();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(formData.email, formData.password);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            {/* Language Switcher - floating */}
            <div className="lang-switcher-float">
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

            <div className="login-card">
                <div className="login-header">
                    <div className="login-logo">
                        <div className="login-logo-icon">DD</div>
                        <h1 style={{ fontSize: '1.75rem' }}>{t('login.title')}</h1>
                    </div>
                    <p style={{ color: 'var(--neutral-400)' }}>{t('login.subtitle')}</p>
                </div>
                <form onSubmit={handleSubmit} className="login-form">
                    {error && <div className="alert alert-danger"><span>⚠️</span><span>{error}</span></div>}
                    <div className="form-group">
                        <label className="form-label required">{t('login.email')}</label>
                        <input type="email" className="form-input" placeholder="email@company.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label required">{t('login.password')}</label>
                        <input type="password" className="form-input" placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required minLength={6} />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
                        {loading ? t('login.loading') : t('login.enter')}
                    </button>
                </form>
                <div className="login-footer">
                    <p style={{ color: 'var(--neutral-500)', fontSize: '0.875rem' }}>
                        {t('login.adminNote')}
                    </p>
                </div>
            </div>
        </div>
    );
}
