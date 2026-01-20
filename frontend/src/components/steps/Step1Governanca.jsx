export default function Step1Governanca({ data, updateData, disabled }) {
    const formData = data.governanca || {};
    const handleChange = (e) => { const { name, value, type, checked } = e.target; updateData('governanca', { [name]: type === 'checkbox' ? checked : value }); };

    return (
        <div>
            <div className="step-section">
                <h3 className="step-section-title">Informações Jurisdicionais</h3>
                <div className="form-row">
                    <div className="form-group"><label className="form-label required">País de Sede</label><input type="text" name="pais_sede" className="form-input" placeholder="Ex: Brasil" value={formData.pais_sede || ''} onChange={handleChange} disabled={disabled} /></div>
                    <div className="form-group"><label className="form-label required">Jurisdições de Operação</label><input type="text" name="jurisdicoes_operacao" className="form-input" placeholder="Ex: Brasil, Portugal" value={formData.jurisdicoes_operacao || ''} onChange={handleChange} disabled={disabled} /><span className="form-hint">Separe por vírgula</span></div>
                </div>
                <div className="form-group"><label className="form-label">Licenças Regulatórias</label><textarea name="licencas_regulatorias" className="form-textarea" placeholder="Liste as licenças..." value={formData.licencas_regulatorias || ''} onChange={handleChange} disabled={disabled} /></div>
            </div>
            <div className="step-section">
                <h3 className="step-section-title">Data Protection Officer (DPO)</h3>
                <div className="form-group">
                    <label className="form-label required">A empresa possui DPO designado?</label>
                    <div className="radio-group-horizontal">
                        <label className="form-check">
                            <input type="radio" name="possui_dpo" value="sim" checked={formData.possui_dpo === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Sim</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="possui_dpo" value="nao" checked={formData.possui_dpo === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">Não</span>
                        </label>
                    </div>
                </div>
                {formData.possui_dpo === 'sim' && (
                    <div className="form-row" style={{ marginTop: '1rem', animation: 'fadeIn 0.3s ease-in-out' }}>
                        <div className="form-group">
                            <label className="form-label required">Nome do DPO</label>
                            <input type="text" name="dpo_nome" className="form-input" placeholder="Nome completo do DPO" value={formData.dpo_nome || ''} onChange={handleChange} disabled={disabled} />
                        </div>
                        <div className="form-group">
                            <label className="form-label required">Email do DPO</label>
                            <input type="email" name="dpo_email" className="form-input" placeholder="email@empresa.com" value={formData.dpo_email || ''} onChange={handleChange} disabled={disabled} />
                        </div>
                    </div>
                )}
            </div>
            <div className="step-section">
                <h3 className="step-section-title">Políticas</h3>
                <div className="form-group"><label className="form-label">Política de Privacidade publicada?</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="politica_privacidade" value="sim" checked={formData.politica_privacidade === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Sim</span></label>
                    <label className="form-check"><input type="radio" name="politica_privacidade" value="nao" checked={formData.politica_privacidade === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Não</span></label>
                </div></div>
                <div className="form-group"><label className="form-label">Política de Segurança da Informação?</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="politica_seguranca" value="sim" checked={formData.politica_seguranca === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Sim</span></label>
                    <label className="form-check"><input type="radio" name="politica_seguranca" value="nao" checked={formData.politica_seguranca === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Não</span></label>
                </div></div>
            </div>
        </div>
    );
}
