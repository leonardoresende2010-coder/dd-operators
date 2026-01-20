export default function Step7RH({ data, updateData, disabled }) {
    const formData = data.rh || {};
    const handleChange = (e) => { const { name, value } = e.target; updateData('rh', { [name]: value }); };

    return (
        <div>
            <div className="step-section">
                <h3 className="step-section-title">Background Checks</h3>
                <div className="form-group"><label className="form-label required">Realiza background check?</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="background_check" value="sim" checked={formData.background_check === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Sim</span></label>
                    <label className="form-check"><input type="radio" name="background_check" value="nao" checked={formData.background_check === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Não</span></label>
                </div></div>
                {formData.background_check === 'sim' && (
                    <div className="form-group"><label className="form-label">Tipos de verificação</label><textarea name="bg_tipos" className="form-textarea" placeholder="Ex: Antecedentes criminais, histórico profissional..." value={formData.bg_tipos || ''} onChange={handleChange} disabled={disabled} /></div>
                )}
            </div>
            <div className="step-section">
                <h3 className="step-section-title">Security Operations Center (SOC)</h3>
                <div className="form-group"><label className="form-label required">Possui SOC?</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="soc_existe" value="sim" checked={formData.soc_existe === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Sim</span></label>
                    <label className="form-check"><input type="radio" name="soc_existe" value="nao" checked={formData.soc_existe === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Não</span></label>
                </div></div>
                {formData.soc_existe === 'sim' && (
                    <>
                        <div className="form-group"><label className="form-label required">Opera 24/7?</label><div className="radio-group-horizontal">
                            <label className="form-check"><input type="radio" name="soc_24x7" value="sim" checked={formData.soc_24x7 === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Sim, 24/7</span></label>
                            <label className="form-check"><input type="radio" name="soc_24x7" value="nao" checked={formData.soc_24x7 === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Não</span></label>
                        </div></div>
                        <div className="form-group"><label className="form-label">Modelo do SOC</label>
                            <select name="soc_modelo" className="form-select" value={formData.soc_modelo || ''} onChange={handleChange} disabled={disabled}>
                                <option value="">Selecione...</option><option value="interno">Interno</option><option value="terceirizado">Terceirizado (MSSP)</option><option value="hibrido">Híbrido</option>
                            </select></div>
                    </>
                )}
            </div>
            <div className="step-section">
                <h3 className="step-section-title">Treinamentos</h3>
                <div className="form-group"><label className="form-label">Treinamentos de segurança?</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="treinamento_seguranca" value="sim" checked={formData.treinamento_seguranca === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Sim</span></label>
                    <label className="form-check"><input type="radio" name="treinamento_seguranca" value="nao" checked={formData.treinamento_seguranca === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Não</span></label>
                </div></div>
            </div>
        </div>
    );
}
