import { useLanguage } from '../../context/LanguageContext';

export default function Step1Governanca({ data, updateData, disabled }) {
    const { t } = useLanguage();
    const formData = data.governanca || {};
    const handleChange = (e) => { const { name, value, type, checked } = e.target; updateData('governanca', { [name]: type === 'checkbox' ? checked : value }); };

    return (
        <div>
            <div className="step-section">
                <h3 className="step-section-title">{t('step1.title')}</h3>
                <div className="form-row">
                    <div className="form-group"><label className="form-label required">{t('step1.country')}</label><input type="text" name="pais_sede" className="form-input" placeholder="Ex: Brasil / USA" value={formData.pais_sede || ''} onChange={handleChange} disabled={disabled} /></div>
                    <div className="form-group"><label className="form-label required">{t('step1.licenses')}</label><input type="text" name="jurisdicoes_operacao" className="form-input" placeholder={t('step1.licensesPlaceholder')} value={formData.jurisdicoes_operacao || ''} onChange={handleChange} disabled={disabled} /></div>
                </div>
                <div className="form-group"><label className="form-label">{t('step1.licenses')}</label><textarea name="licencas_regulatorias" className="form-textarea" placeholder={t('step1.licensesPlaceholder')} value={formData.licencas_regulatorias || ''} onChange={handleChange} disabled={disabled} /></div>
            </div>
            <div className="step-section">
                <h3 className="step-section-title">Data Protection Officer (DPO)</h3>
                <div className="form-group">
                    <label className="form-label required">{t('step1.hasDpo')}</label>
                    <div className="radio-group-horizontal">
                        <label className="form-check">
                            <input type="radio" name="possui_dpo" value="sim" checked={formData.possui_dpo === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step1.yes')}</span>
                        </label>
                        <label className="form-check">
                            <input type="radio" name="possui_dpo" value="nao" checked={formData.possui_dpo === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" />
                            <span className="form-check-label">{t('step1.no')}</span>
                        </label>
                    </div>
                </div>
                {formData.possui_dpo === 'sim' && (
                    <div className="form-row" style={{ marginTop: '1rem', animation: 'fadeIn 0.3s ease-in-out' }}>
                        <div className="form-group">
                            <label className="form-label required">{t('step1.dpoName')}</label>
                            <input type="text" name="dpo_nome" className="form-input" placeholder="John Doe" value={formData.dpo_nome || ''} onChange={handleChange} disabled={disabled} />
                        </div>
                        <div className="form-group">
                            <label className="form-label required">{t('step1.dpoEmail')}</label>
                            <input type="email" name="dpo_email" className="form-input" placeholder="dpo@company.com" value={formData.dpo_email || ''} onChange={handleChange} disabled={disabled} />
                        </div>
                    </div>
                )}
            </div>
            <div className="step-section">
                <h3 className="step-section-title">{t('step1.policies')}</h3>
                <div className="form-group"><label className="form-label">{t('step1.policies')}</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="politica_privacidade" value="sim" checked={formData.politica_privacidade === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.yes')}</span></label>
                    <label className="form-check"><input type="radio" name="politica_privacidade" value="nao" checked={formData.politica_privacidade === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.no')}</span></label>
                </div></div>
                <div className="form-group"><label className="form-label">{t('step1.policyAcceptance')}</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="politica_seguranca" value="sim" checked={formData.politica_seguranca === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.yes')}</span></label>
                    <label className="form-check"><input type="radio" name="politica_seguranca" value="nao" checked={formData.politica_seguranca === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.no')}</span></label>
                </div></div>
            </div>
        </div>
    );
}
