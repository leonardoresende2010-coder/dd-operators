export default function Step4Incidentes({ data, updateData, disabled }) {
    const formData = data.incidentes || {};
    const handleChange = (e) => { const { name, value } = e.target; updateData('incidentes', { [name]: value }); };

    return (
        <div>
            <div className="step-section">
                <h3 className="step-section-title">Plano de Resposta a Incidentes</h3>
                <div className="form-group"><label className="form-label required">Possui Plano documentado?</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="plano_documentado" value="sim" checked={formData.plano_documentado === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Sim</span></label>
                    <label className="form-check"><input type="radio" name="plano_documentado" value="nao" checked={formData.plano_documentado === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Não</span></label>
                </div></div>
            </div>
            <div className="step-section">
                <h3 className="step-section-title">Continuidade de Negócios</h3>
                <div className="form-row">
                    <div className="form-group"><label className="form-label required">RTO (Recovery Time Objective)</label>
                        <select name="rto" className="form-select" value={formData.rto || ''} onChange={handleChange} disabled={disabled}>
                            <option value="">Selecione...</option><option value="1h">Até 1 hora</option><option value="4h">Até 4 horas</option><option value="8h">Até 8 horas</option><option value="24h">Até 24 horas</option>
                        </select><span className="form-hint">Tempo máximo de indisponibilidade</span></div>
                    <div className="form-group"><label className="form-label required">RPO (Recovery Point Objective)</label>
                        <select name="rpo" className="form-select" value={formData.rpo || ''} onChange={handleChange} disabled={disabled}>
                            <option value="">Selecione...</option><option value="0">Zero (tempo real)</option><option value="1h">Até 1 hora</option><option value="4h">Até 4 horas</option><option value="24h">Até 24 horas</option>
                        </select><span className="form-hint">Perda máxima de dados</span></div>
                </div>
            </div>
            <div className="step-section">
                <h3 className="step-section-title">Equipe e Seguros</h3>
                <div className="form-group"><label className="form-label">Possui equipe de resposta a incidentes?</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="csirt_existe" value="sim" checked={formData.csirt_existe === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Sim</span></label>
                    <label className="form-check"><input type="radio" name="csirt_existe" value="nao" checked={formData.csirt_existe === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Não</span></label>
                </div></div>
                <div className="form-group"><label className="form-label">Possui seguro cyber?</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="seguro_cyber" value="sim" checked={formData.seguro_cyber === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Sim</span></label>
                    <label className="form-check"><input type="radio" name="seguro_cyber" value="nao" checked={formData.seguro_cyber === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Não</span></label>
                </div></div>
            </div>
        </div>
    );
}
