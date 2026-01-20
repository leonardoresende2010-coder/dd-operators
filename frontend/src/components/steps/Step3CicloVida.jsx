export default function Step3CicloVida({ data, updateData, disabled }) {
    const formData = data.ciclo_vida || {};
    const handleChange = (e) => { const { name, value } = e.target; updateData('ciclo_vida', { [name]: value }); };

    return (
        <div>
            <div className="step-section">
                <h3 className="step-section-title">Coleta e Armazenamento de Dados</h3>
                <div className="form-group"><label className="form-label required">Período de retenção de dados</label>
                    <select name="retencao_periodo" className="form-select" value={formData.retencao_periodo || ''} onChange={handleChange} disabled={disabled}>
                        <option value="">Selecione...</option><option value="6_meses">6 meses</option><option value="1_ano">1 ano</option><option value="2_anos">2 anos</option><option value="5_anos">5 anos</option><option value="10_anos">10 anos</option>
                    </select></div>
            </div>
            <div className="step-section">
                <h3 className="step-section-title">Descarte Seguro</h3>
                <div className="form-group"><label className="form-label required">Processo documentado para descarte?</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="descarte_documentado" value="sim" checked={formData.descarte_documentado === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Sim</span></label>
                    <label className="form-check"><input type="radio" name="descarte_documentado" value="nao" checked={formData.descarte_documentado === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Não</span></label>
                </div></div>
                <div className="form-group"><label className="form-label">Método de descarte</label>
                    <select name="descarte_metodo" className="form-select" value={formData.descarte_metodo || ''} onChange={handleChange} disabled={disabled}>
                        <option value="">Selecione...</option><option value="wipe_seguro">Wipe seguro</option><option value="destruicao_fisica">Destruição física</option><option value="anonimizacao">Anonimização</option>
                    </select></div>
            </div>
            <div className="step-section">
                <h3 className="step-section-title">Conformidade LGPD</h3>
                <div className="form-group"><label className="form-label required">Conformidade com LGPD</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="lgpd_conformidade" value="total" checked={formData.lgpd_conformidade === 'total'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Total</span></label>
                    <label className="form-check"><input type="radio" name="lgpd_conformidade" value="parcial" checked={formData.lgpd_conformidade === 'parcial'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Parcial</span></label>
                    <label className="form-check"><input type="radio" name="lgpd_conformidade" value="em_implementacao" checked={formData.lgpd_conformidade === 'em_implementacao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Em implementação</span></label>
                </div></div>
            </div>
        </div>
    );
}
