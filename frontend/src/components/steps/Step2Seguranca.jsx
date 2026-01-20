export default function Step2Seguranca({ data, updateData, disabled }) {
    const formData = data.seguranca || {};
    const handleChange = (e) => { const { name, value, type, checked } = e.target; updateData('seguranca', { [name]: type === 'checkbox' ? checked : value }); };

    return (
        <div>
            <div className="step-section">
                <h3 className="step-section-title">Criptografia</h3>
                <div className="form-row">
                    <div className="form-group"><label className="form-label required">Criptografia em repouso</label>
                        <select name="criptografia_repouso" className="form-select" value={formData.criptografia_repouso || ''} onChange={handleChange} disabled={disabled}>
                            <option value="">Selecione...</option><option value="AES-256">AES-256</option><option value="AES-128">AES-128</option><option value="outro">Outro</option><option value="nenhum">Não utiliza</option>
                        </select></div>
                    <div className="form-group"><label className="form-label required">Protocolo em trânsito</label>
                        <select name="criptografia_transito" className="form-select" value={formData.criptografia_transito || ''} onChange={handleChange} disabled={disabled}>
                            <option value="">Selecione...</option><option value="TLS-1.3">TLS 1.3</option><option value="TLS-1.2">TLS 1.2</option>
                        </select></div>
                </div>
            </div>
            <div className="step-section">
                <h3 className="step-section-title">Autenticação Multi-Fator (MFA)</h3>
                <div className="form-group"><label className="form-label required">MFA implementado?</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="mfa_implementado" value="sim" checked={formData.mfa_implementado === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Sim</span></label>
                    <label className="form-check"><input type="radio" name="mfa_implementado" value="nao" checked={formData.mfa_implementado === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Não</span></label>
                </div></div>
            </div>
            <div className="step-section">
                <h3 className="step-section-title">Testes de Segurança (Pentests)</h3>
                <div className="form-group"><label className="form-label required">Realiza pentests regularmente?</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="pentest_regular" value="sim" checked={formData.pentest_regular === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Sim</span></label>
                    <label className="form-check"><input type="radio" name="pentest_regular" value="nao" checked={formData.pentest_regular === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Não</span></label>
                </div></div>
                {formData.pentest_regular === 'sim' && (
                    <div className="form-row">
                        <div className="form-group"><label className="form-label">Frequência</label><select name="pentest_frequencia" className="form-select" value={formData.pentest_frequencia || ''} onChange={handleChange} disabled={disabled}><option value="">Selecione...</option><option value="mensal">Mensal</option><option value="trimestral">Trimestral</option><option value="semestral">Semestral</option><option value="anual">Anual</option></select></div>
                        <div className="form-group"><label className="form-label">Último pentest</label><input type="date" name="pentest_ultima_data" className="form-input" value={formData.pentest_ultima_data || ''} onChange={handleChange} disabled={disabled} /></div>
                    </div>
                )}
            </div>
        </div>
    );
}
