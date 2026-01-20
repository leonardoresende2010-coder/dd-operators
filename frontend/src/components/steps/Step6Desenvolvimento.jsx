import { useLanguage } from '../../context/LanguageContext';

export default function Step6Desenvolvimento({ data, updateData, disabled }) {
    const { t } = useLanguage();
    const formData = data.desenvolvimento || {};
    const handleChange = (e) => { const { name, value } = e.target; updateData('desenvolvimento', { [name]: value }); };

    return (
        <div>
            <div className="step-section">
                <h3 className="step-section-title">{t('step5.title')}</h3>
                <div className="form-group"><label className="form-label required">{t('step5.sdlc')}</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="sdlc_implementado" value="sim" checked={formData.sdlc_implementado === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.yes')}</span></label>
                    <label className="form-check"><input type="radio" name="sdlc_implementado" value="nao" checked={formData.sdlc_implementado === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.no')}</span></label>
                </div></div>
                <div className="form-group"><label className="form-label">Methodologies</label><textarea name="sdlc_metodologias" className="form-textarea" placeholder="E.g.: OWASP SAMM, OWASP ASVS, Microsoft SDL..." value={formData.sdlc_metodologias || ''} onChange={handleChange} disabled={disabled} /></div>
                <div className="form-group"><label className="form-label">{t('step5.sast')}</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="sast_dast" value="sim" checked={formData.sast_dast === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.yes')}</span></label>
                    <label className="form-check"><input type="radio" name="sast_dast" value="nao" checked={formData.sast_dast === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.no')}</span></label>
                </div></div>
            </div>
            <div className="step-section">
                <h3 className="step-section-title">Artificial Intelligence (AI)</h3>
                <div className="form-group"><label className="form-label required">{t('step5.ai')}</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="ia_utiliza" value="sim" checked={formData.ia_utiliza === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.yes')}</span></label>
                    <label className="form-check"><input type="radio" name="ia_utiliza" value="nao" checked={formData.ia_utiliza === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.no')}</span></label>
                </div></div>
                {formData.ia_utiliza === 'sim' && (
                    <>
                        <div className="form-group"><label className="form-label">AI Purposes</label><textarea name="ia_finalidades" className="form-textarea" placeholder="E.g.: Fraud detection, risk analysis, chatbot..." value={formData.ia_finalidades || ''} onChange={handleChange} disabled={disabled} /></div>
                        <div className="form-group"><label className="form-label required">{t('step5.aiDataProtection')}</label><div className="radio-group-horizontal">
                            <label className="form-check"><input type="radio" name="ia_treino_dados" value="sim" checked={formData.ia_treino_dados === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.yes')}</span></label>
                            <label className="form-check"><input type="radio" name="ia_treino_dados" value="nao" checked={formData.ia_treino_dados === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.no')}</span></label>
                        </div></div>
                        {formData.ia_treino_dados === 'sim' && (
                            <div className="form-group"><label className="form-label">User consent obtained?</label><div className="radio-group-horizontal">
                                <label className="form-check"><input type="radio" name="ia_consentimento" value="sim" checked={formData.ia_consentimento === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.yes')}</span></label>
                                <label className="form-check"><input type="radio" name="ia_consentimento" value="nao" checked={formData.ia_consentimento === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.no')}</span></label>
                            </div></div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
