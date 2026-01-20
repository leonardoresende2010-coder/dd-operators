import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const { login, register } = useAuth();
    const [isRegister, setIsRegister] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({ email: '', password: '', nome_empresa: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            if (isRegister) await register(formData.email, formData.password, formData.nome_empresa);
            else await login(formData.email, formData.password);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="login-logo">
                        <div className="login-logo-icon">DD</div>
                        <h1 style={{ fontSize: '1.75rem' }}>Due Diligence</h1>
                    </div>
                    <p style={{ color: 'var(--neutral-400)' }}>{isRegister ? 'Cadastre sua empresa' : 'Acesse o sistema'}</p>
                </div>
                <form onSubmit={handleSubmit} className="login-form">
                    {error && <div className="alert alert-danger"><span>⚠️</span><span>{error}</span></div>}
                    {isRegister && (
                        <div className="form-group">
                            <label className="form-label required">Nome da Empresa</label>
                            <input type="text" className="form-input" placeholder="Minha Empresa S.A." value={formData.nome_empresa} onChange={(e) => setFormData({ ...formData, nome_empresa: e.target.value })} required />
                        </div>
                    )}
                    <div className="form-group">
                        <label className="form-label required">Email</label>
                        <input type="email" className="form-input" placeholder="seu@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label required">Senha</label>
                        <input type="password" className="form-input" placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required minLength={6} />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
                        {loading ? 'Carregando...' : isRegister ? 'Cadastrar' : 'Entrar'}
                    </button>
                </form>
                <div className="login-footer">
                    <p style={{ color: 'var(--neutral-400)' }}>
                        {isRegister ? 'Já tem conta?' : 'Não tem conta?'}
                        <button className="login-toggle" onClick={() => { setIsRegister(!isRegister); setError(''); }}>
                            {isRegister ? 'Fazer login' : 'Cadastrar'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
