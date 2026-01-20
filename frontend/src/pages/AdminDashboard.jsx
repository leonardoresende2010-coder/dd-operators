import { useState, useEffect } from 'react';
import { adminAPI } from '../services/api';
import Header from '../components/Header';

export default function AdminDashboard() {
    const [operadores, setOperadores] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedOperador, setSelectedOperador] = useState(null);
    const [detalhes, setDetalhes] = useState(null);

    useEffect(() => { loadData(); }, []);

    const loadData = async () => {
        try {
            const [ops, st] = await Promise.all([adminAPI.getOperadores(), adminAPI.getEstatisticas()]);
            setOperadores(ops);
            setStats(st);
        } catch (error) { console.error(error); }
        finally { setLoading(false); }
    };

    const viewDetalhes = async (id) => {
        setSelectedOperador(id);
        try { const data = await adminAPI.getOperador(id); setDetalhes(data); }
        catch (error) { console.error(error); }
    };

    const toggleStatus = async (id, current) => {
        await adminAPI.updateStatus(id, current === 'ativo' ? 'inativo' : 'ativo');
        loadData();
    };

    if (loading) return <div className="app-container"><Header /><div className="loading-overlay" style={{ position: 'relative', background: 'transparent' }}><div className="loading-spinner"></div></div></div>;

    return (
        <div className="app-container">
            <Header />
            <main className="main-content">
                <div style={{ marginBottom: '2rem' }}><h1>Dashboard Administrativo</h1><p style={{ color: 'var(--neutral-400)' }}>Gerencie operadores e visualize status</p></div>

                <div className="stats-grid">
                    <div className="stat-card"><div className="stat-icon" style={{ background: 'linear-gradient(135deg, #3b82f6, #60a5fa)' }}>👥</div><div><div className="stat-value">{stats?.total_operadores || 0}</div><div className="stat-label">Operadores</div></div></div>
                    <div className="stat-card"><div className="stat-icon" style={{ background: 'linear-gradient(135deg, #10b981, #34d399)' }}>✓</div><div><div className="stat-value">{stats?.finalizados || 0}</div><div className="stat-label">Finalizados</div></div></div>
                    <div className="stat-card"><div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24)' }}>⏳</div><div><div className="stat-value">{stats?.em_andamento || 0}</div><div className="stat-label">Em Andamento</div></div></div>
                    <div className="stat-card"><div className="stat-icon" style={{ background: 'linear-gradient(135deg, #ef4444, #f87171)' }}>⚠️</div><div><div className="stat-value">{stats?.alertas_criticos || 0}</div><div className="stat-label">Alertas</div></div></div>
                </div>

                <div className="card">
                    <div className="card-header"><h2 className="card-title">Operadores</h2><span className="badge badge-neutral">{operadores.length}</span></div>
                    <div className="table-container">
                        <table className="table">
                            <thead><tr><th>Empresa</th><th>Email</th><th>Status</th><th>Progresso</th><th>Ações</th></tr></thead>
                            <tbody>
                                {operadores.map(op => (
                                    <tr key={op.id}>
                                        <td><strong>{op.nome_empresa}</strong></td>
                                        <td style={{ color: 'var(--neutral-400)' }}>{op.email}</td>
                                        <td><span className={`badge ${op.status === 'ativo' ? 'badge-success' : 'badge-danger'}`}>{op.status}</span></td>
                                        <td><div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><div className="progress-bar"><div className="progress-fill" style={{ width: `${(op.secoes_preenchidas / 10) * 100}%` }} /></div><span>{op.progresso}</span>{op.status_submissao === 'finalizado' && <span className="badge badge-success">✓</span>}</div></td>
                                        <td><div style={{ display: 'flex', gap: '0.5rem' }}><button className="btn btn-sm btn-outline" onClick={() => viewDetalhes(op.id)}>👁️ Ver</button><button className="btn btn-sm btn-ghost" onClick={() => toggleStatus(op.id, op.status)}>{op.status === 'ativo' ? '🔒' : '🔓'}</button></div></td>
                                    </tr>
                                ))}
                                {operadores.length === 0 && <tr><td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--neutral-500)' }}>Nenhum operador</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {selectedOperador && (
                <div className="modal-overlay" onClick={() => { setSelectedOperador(null); setDetalhes(null); }}>
                    <div className="modal" style={{ maxWidth: 700 }} onClick={e => e.stopPropagation()}>
                        <div className="modal-header"><h3 className="modal-title">Detalhes: {detalhes?.operador?.nome_empresa || '...'}</h3><button className="modal-close" onClick={() => { setSelectedOperador(null); setDetalhes(null); }}>×</button></div>
                        <div className="modal-body">
                            {detalhes ? (
                                <div>
                                    <p><strong>Email:</strong> {detalhes.operador?.email}</p>
                                    <p><strong>Status:</strong> <span className={`badge ${detalhes.respostas?.status_submissao === 'finalizado' ? 'badge-success' : 'badge-warning'}`}>{detalhes.respostas?.status_submissao || 'Não iniciado'}</span></p>
                                    {detalhes.respostas?.data_envio && <p><strong>Enviado:</strong> {new Date(detalhes.respostas.data_envio).toLocaleString('pt-BR')}</p>}
                                    {detalhes.arquivos?.length > 0 && (
                                        <div style={{ marginTop: '1rem' }}><h4>Arquivos ({detalhes.arquivos.length})</h4>
                                            {detalhes.arquivos.map(a => (<div key={a.id} style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--neutral-800)' }}>📄 {a.nome_original}</div>))}
                                        </div>
                                    )}
                                </div>
                            ) : <div className="loading-spinner" style={{ margin: '2rem auto' }}></div>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
