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

    // Função para converter respostas em formato legível
    const formatRespostas = (respostas) => {
        if (!respostas) return {};
        const secoes = {
            'Governança': respostas.secao_1_governanca,
            'Segurança': respostas.secao_2_seguranca,
            'Ciclo de Vida': respostas.secao_3_ciclo_vida,
            'Incidentes': respostas.secao_4_incidentes,
            'Desenvolvimento': respostas.secao_6_desenvolvimento,
            'RH': respostas.secao_7_rh,
            'Integridade': respostas.secao_9_integridade
        };
        return secoes;
    };

    // Função para exportar CSV de um operador
    const exportCSV = (operador, respostas) => {
        const rows = [['Seção', 'Pergunta', 'Resposta']];
        const secoes = formatRespostas(respostas);

        Object.entries(secoes).forEach(([secaoNome, dados]) => {
            if (dados && typeof dados === 'object') {
                Object.entries(dados).forEach(([pergunta, resposta]) => {
                    const perguntaFormatada = pergunta.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                    rows.push([secaoNome, perguntaFormatada, resposta || '']);
                });
            }
        });

        const csvContent = rows.map(row =>
            row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
        ).join('\n');

        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `due_diligence_${operador.nome_empresa.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // Função para exportar todos os operadores finalizados
    const exportAllCSV = () => {
        const finalizados = operadores.filter(op => op.status_submissao === 'finalizado');
        if (finalizados.length === 0) {
            alert('Nenhum operador finalizou o questionário ainda.');
            return;
        }

        const rows = [['Empresa', 'Email', 'Status', 'Data Envio', 'Progresso']];
        finalizados.forEach(op => {
            rows.push([
                op.nome_empresa,
                op.email,
                op.status_submissao,
                op.data_envio ? new Date(op.data_envio).toLocaleString('pt-BR') : '',
                op.progresso
            ]);
        });

        const csvContent = rows.map(row =>
            row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
        ).join('\n');

        const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `operadores_finalizados_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    if (loading) return <div className="app-container"><Header /><div className="loading-overlay" style={{ position: 'relative', background: 'transparent' }}><div className="loading-spinner"></div></div></div>;

    return (
        <div className="app-container">
            <Header />
            <main className="main-content">
                <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div>
                        <h1>Dashboard Administrativo</h1>
                        <p style={{ color: 'var(--neutral-400)' }}>Gerencie operadores e visualize status</p>
                    </div>
                    <button className="btn btn-primary" onClick={exportAllCSV}>
                        📊 Exportar Finalizados (CSV)
                    </button>
                </div>

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
                                        <td><div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><div className="progress-bar"><div className="progress-fill" style={{ width: `${(op.secoes_preenchidas / 8) * 100}%` }} /></div><span>{op.progresso}</span>{op.status_submissao === 'finalizado' && <span className="badge badge-success">✓</span>}</div></td>
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
                    <div className="modal" style={{ maxWidth: 900, maxHeight: '90vh', overflow: 'auto' }} onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">Detalhes: {detalhes?.operador?.nome_empresa || '...'}</h3>
                            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                                {detalhes?.respostas && (
                                    <button className="btn btn-sm btn-primary" onClick={() => exportCSV(detalhes.operador, detalhes.respostas)}>
                                        📥 Exportar CSV
                                    </button>
                                )}
                                <button className="modal-close" onClick={() => { setSelectedOperador(null); setDetalhes(null); }}>×</button>
                            </div>
                        </div>
                        <div className="modal-body">
                            {detalhes ? (
                                <div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem', padding: '1rem', background: 'rgba(15, 23, 42, 0.5)', borderRadius: '0.75rem' }}>
                                        <p><strong>Email:</strong> {detalhes.operador?.email}</p>
                                        <p><strong>Status:</strong> <span className={`badge ${detalhes.respostas?.status_submissao === 'finalizado' ? 'badge-success' : 'badge-warning'}`}>{detalhes.respostas?.status_submissao || 'Não iniciado'}</span></p>
                                        {detalhes.respostas?.data_envio && <p><strong>Enviado:</strong> {new Date(detalhes.respostas.data_envio).toLocaleString('pt-BR')}</p>}
                                    </div>

                                    {/* Mostrar respostas por seção */}
                                    {detalhes.respostas && (
                                        <div>
                                            <h4 style={{ marginBottom: '1rem', color: 'var(--primary-400)' }}>📋 Respostas do Questionário</h4>
                                            {Object.entries(formatRespostas(detalhes.respostas)).map(([secaoNome, dados]) => (
                                                dados && Object.keys(dados).length > 0 && (
                                                    <div key={secaoNome} style={{ marginBottom: '1.5rem' }}>
                                                        <h5 style={{ color: 'var(--neutral-200)', borderBottom: '1px solid var(--neutral-700)', paddingBottom: '0.5rem', marginBottom: '0.75rem' }}>
                                                            {secaoNome}
                                                        </h5>
                                                        <div style={{ display: 'grid', gap: '0.5rem' }}>
                                                            {Object.entries(dados).map(([pergunta, resposta]) => (
                                                                <div key={pergunta} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '0.5rem', background: 'rgba(30, 41, 59, 0.5)', borderRadius: '0.5rem' }}>
                                                                    <span style={{ color: 'var(--neutral-400)', fontSize: '0.875rem' }}>
                                                                        {pergunta.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                                                    </span>
                                                                    <span style={{ color: 'var(--neutral-100)', fontWeight: 500 }}>
                                                                        {resposta || <span style={{ color: 'var(--neutral-500)' }}>—</span>}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )
                                            ))}
                                        </div>
                                    )}

                                    {detalhes.arquivos?.length > 0 && (
                                        <div style={{ marginTop: '1.5rem' }}>
                                            <h4 style={{ marginBottom: '1rem', color: 'var(--primary-400)' }}>📁 Arquivos Enviados ({detalhes.arquivos.length})</h4>
                                            {detalhes.arquivos.map(a => (
                                                <div key={a.id} style={{ padding: '0.75rem', borderBottom: '1px solid var(--neutral-800)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <span>📄 {a.nome_original}</span>
                                                    <span className="badge badge-neutral">{a.categoria}</span>
                                                </div>
                                            ))}
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
