import { useState, useEffect, useRef } from 'react';
import { uploadAPI } from '../../services/api';

export default function Step9Upload({ disabled }) {
    const [files, setFiles] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    useEffect(() => { loadFiles(); }, []);
    const loadFiles = async () => { try { const data = await uploadAPI.list(); setFiles(data); } catch (err) { console.error(err); } };

    const handleFileSelect = async (e) => {
        if (disabled) return;
        setError('');
        setUploading(true);
        for (const file of Array.from(e.target.files)) {
            if (file.size > 10 * 1024 * 1024) { setError(`${file.name} excede 10MB`); continue; }
            const categoria = file.name.toLowerCase().includes('iso') ? 'iso_certificate' : file.name.toLowerCase().includes('soc') ? 'soc2_certificate' : file.name.toLowerCase().includes('pentest') ? 'pentest_summary' : 'other';
            try { await uploadAPI.upload(file, categoria); } catch (err) { setError(`Erro: ${file.name}`); }
        }
        await loadFiles();
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleRemove = async (id) => {
        if (disabled || !window.confirm('Remover arquivo?')) return;
        try { await uploadAPI.remove(id); await loadFiles(); } catch (err) { setError('Erro ao remover'); }
    };

    const formatSize = (bytes) => bytes < 1024 ? bytes + ' B' : bytes < 1024 * 1024 ? (bytes / 1024).toFixed(1) + ' KB' : (bytes / (1024 * 1024)).toFixed(1) + ' MB';

    return (
        <div>
            <div className="step-section">
                <h3 className="step-section-title">Upload de Documentos</h3>
                <p style={{ color: 'var(--neutral-400)', marginBottom: '1.5rem' }}>Anexe certificados ISO/SOC2, sumários de Pentest e outros documentos.</p>
                {error && <div className="alert alert-danger"><span>⚠️</span><span>{error}</span></div>}
                <div className="file-upload-zone" onClick={() => !disabled && fileInputRef.current?.click()} style={{ opacity: disabled ? 0.5 : 1 }}>
                    <div style={{ fontSize: '3rem', color: 'var(--neutral-500)', marginBottom: '1rem' }}>📁</div>
                    <p style={{ color: 'var(--neutral-300)' }}>{uploading ? 'Enviando...' : 'Clique para selecionar arquivos'}</p>
                    <p style={{ color: 'var(--neutral-500)', fontSize: '0.875rem' }}>PDF, PNG, JPG, DOC até 10MB</p>
                    <input ref={fileInputRef} type="file" multiple accept=".pdf,.png,.jpg,.jpeg,.doc,.docx" onChange={handleFileSelect} style={{ display: 'none' }} disabled={disabled} />
                </div>
                {files.length > 0 && (
                    <div className="file-list">
                        {files.map(file => (
                            <div key={file.id} className="file-item">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <span>📄</span>
                                    <div><div style={{ color: 'var(--neutral-200)' }}>{file.nome_original}</div><div style={{ fontSize: '0.8125rem', color: 'var(--neutral-500)' }}>{formatSize(file.tamanho_bytes)}</div></div>
                                </div>
                                {!disabled && <button onClick={() => handleRemove(file.id)} style={{ background: 'none', border: 'none', color: 'var(--neutral-400)', cursor: 'pointer' }}>✕</button>}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="step-section">
                <h3 className="step-section-title">Documentos Recomendados</h3>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                    {[{ icon: '🏆', name: 'Certificado ISO 27001' }, { icon: '🛡️', name: 'Certificado SOC 2' }, { icon: '🔍', name: 'Sumário de Pentest' }, { icon: '📋', name: 'Certificação RNG' }].map(doc => (
                        <div key={doc.name} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '0.75rem', border: '1px solid var(--neutral-800)' }}>
                            <span style={{ fontSize: '1.5rem' }}>{doc.icon}</span><span style={{ color: 'var(--neutral-200)' }}>{doc.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
