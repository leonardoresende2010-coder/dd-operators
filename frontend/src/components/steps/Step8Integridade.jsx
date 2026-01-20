export default function Step8Integridade({ data, updateData, disabled }) {
    const formData = data.integridade || {};
    const handleChange = (e) => { const { name, value } = e.target; updateData('integridade', { [name]: value }); };

    return (
        <div>
            <div className="step-section">
                <h3 className="step-section-title">Certificações RNG</h3>
                <div className="form-group"><label className="form-label required">Possui certificação RNG?</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="rng_certificado" value="sim" checked={formData.rng_certificado === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Sim</span></label>
                    <label className="form-check"><input type="radio" name="rng_certificado" value="nao" checked={formData.rng_certificado === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Não</span></label>
                    <label className="form-check"><input type="radio" name="rng_certificado" value="na" checked={formData.rng_certificado === 'na'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">N/A</span></label>
                </div></div>
                {formData.rng_certificado === 'sim' && (
                    <div className="form-row">
                        <div className="form-group"><label className="form-label">Entidade certificadora</label><input type="text" name="rng_certificadora" className="form-input" placeholder="Ex: eCOGRA, GLI, BMM" value={formData.rng_certificadora || ''} onChange={handleChange} disabled={disabled} /></div>
                        <div className="form-group"><label className="form-label">Data da certificação</label><input type="date" name="rng_data" className="form-input" value={formData.rng_data || ''} onChange={handleChange} disabled={disabled} /></div>
                    </div>
                )}
            </div>
            <div className="step-section">
                <h3 className="step-section-title">Certificações de Segurança</h3>
                <div className="form-group"><label className="form-label">Certificações que possui</label><textarea name="certificacoes" className="form-textarea" placeholder="Ex: ISO 27001, SOC 2 Type II, PCI DSS..." value={formData.certificacoes || ''} onChange={handleChange} disabled={disabled} /></div>
            </div>
            <div className="step-section">
                <h3 className="step-section-title">Portabilidade e Saída</h3>
                <div className="form-group"><label className="form-label required">Permite exportação de dados (portabilidade)?</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="portabilidade" value="sim" checked={formData.portabilidade === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Sim</span></label>
                    <label className="form-check"><input type="radio" name="portabilidade" value="nao" checked={formData.portabilidade === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Não</span></label>
                </div></div>
                <div className="form-group"><label className="form-label required">Exclusão completa de conta (right to be forgotten)?</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="exclusao_completa" value="sim" checked={formData.exclusao_completa === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Sim</span></label>
                    <label className="form-check"><input type="radio" name="exclusao_completa" value="nao" checked={formData.exclusao_completa === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Não</span></label>
                </div></div>
                <div className="form-group"><label className="form-label">Observações adicionais</label><textarea name="observacoes" className="form-textarea" placeholder="Informações adicionais..." value={formData.observacoes || ''} onChange={handleChange} disabled={disabled} /></div>
            </div>
        </div>
    );
}
