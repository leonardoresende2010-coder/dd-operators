import { useLanguage } from '../../context/LanguageContext';

export default function Step3CicloVida({ data, updateData, disabled }) {
    const { t } = useLanguage();
    const formData = data.ciclo_vida || {};
    const handleChange = (e) => { const { name, value } = e.target; updateData('ciclo_vida', { [name]: value }); };

    return (
        <div>
            <div className="step-section">
                <h3 className="step-section-title">{t('step3.title')}</h3>
                <div className="form-group"><label className="form-label required">{t('step3.retention')}</label>
                    <select name="retencao_periodo" className="form-select" value={formData.retencao_periodo || ''} onChange={handleChange} disabled={disabled}>
                        <option value="">{t('step3.selectRetention')}</option>
                        <option value="6_meses">6 months</option>
                        <option value="1_ano">{t('step3.oneYear')}</option>
                        <option value="2_anos">2 years</option>
                        <option value="5_anos">{t('step3.fiveYears')}</option>
                        <option value="10_anos">{t('step3.tenYears')}</option>
                        <option value="variavel">{t('step3.variable')}</option>
                    </select>
                </div>
            </div>
            <div className="step-section">
                <h3 className="step-section-title">{t('step3.disposal')}</h3>
                <div className="form-group">
                    <label className="form-label required">{t('step3.disposal')}</label>
                    <div className="radio-group-horizontal">
                        <label className="form-check">
                            <input type="radio" name="descarte_documentado" value="sim" checked={formData.descarte_documentado === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.yes')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="descarte_documentado" value="nao" checked={formData.descarte_documentado === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.no')}</span>
                        </label>
                    </div>
                </div>
                {formData.descarte_documentado === 'sim' && (
                    <div className="form-group" style={{ marginTop: '1rem', animation: 'fadeIn 0.3s ease-in-out' }}>
                        <label className="form-label">{t('step3.disposalMethod')}</label>
                        <select name="descarte_metodo" className="form-select" value={formData.descarte_metodo || ''} onChange={handleChange} disabled={disabled}>
                            <option value="">{t('step3.selectMethod')}</option>
                            <option value="wipe_seguro">{t('step3.secureErasure')}</option>
                            <option value="destruicao_fisica">{t('step3.physicalDestruction')}</option>
                            <option value="anonimizacao">Anonymization</option>
                        </select>
                    </div>
                )}
            </div>
            <div className="step-section">
                <h3 className="step-section-title">{t('step3.compliance')}</h3>
                <div className="form-group">
                    <label className="form-label required">{t('step3.compliance')}</label>
                    <div className="radio-group-horizontal">
                        <label className="form-check">
                            <input type="radio" name="lgpd_conformidade" value="total" checked={formData.lgpd_conformidade === 'total'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('common.yes')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="lgpd_conformidade" value="parcial" checked={formData.lgpd_conformidade === 'parcial'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step3.partial')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="lgpd_conformidade" value="em_implementacao" checked={formData.lgpd_conformidade === 'em_implementacao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">In Progress</span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
