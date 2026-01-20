import { useLanguage } from '../../context/LanguageContext';

export default function Step7RH({ data, updateData, disabled }) {
    const { t } = useLanguage();
    const formData = data.rh || {};
    const handleChange = (e) => { const { name, value } = e.target; updateData('rh', { [name]: value }); };

    return (
        <div>
            <div className="step-section">
                <h3 className="step-section-title">{t('step6.title')}</h3>
                <div className="form-group"><label className="form-label required">{t('step6.backgroundCheck')}</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="background_check" value="sim" checked={formData.background_check === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.yes')}</span></label>
                    <label className="form-check"><input type="radio" name="background_check" value="nao" checked={formData.background_check === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.no')}</span></label>
                </div></div>
                {formData.background_check === 'sim' && (
                    <div className="form-group"><label className="form-label">Verification types</label><textarea name="bg_tipos" className="form-textarea" placeholder="E.g.: Criminal background, employment history..." value={formData.bg_tipos || ''} onChange={handleChange} disabled={disabled} /></div>
                )}
            </div>
            <div className="step-section">
                <h3 className="step-section-title">Security Operations Center (SOC)</h3>
                <div className="form-group"><label className="form-label required">Has SOC?</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="soc_existe" value="sim" checked={formData.soc_existe === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.yes')}</span></label>
                    <label className="form-check"><input type="radio" name="soc_existe" value="nao" checked={formData.soc_existe === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.no')}</span></label>
                </div></div>
                {formData.soc_existe === 'sim' && (
                    <>
                        <div className="form-group"><label className="form-label required">Operates 24/7?</label><div className="radio-group-horizontal">
                            <label className="form-check"><input type="radio" name="soc_24x7" value="sim" checked={formData.soc_24x7 === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.yes')}, 24/7</span></label>
                            <label className="form-check"><input type="radio" name="soc_24x7" value="nao" checked={formData.soc_24x7 === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.no')}</span></label>
                        </div></div>
                        <div className="form-group"><label className="form-label">SOC Model</label>
                            <select name="soc_modelo" className="form-select" value={formData.soc_modelo || ''} onChange={handleChange} disabled={disabled}>
                                <option value="">{t('common.select')}...</option><option value="interno">Internal</option><option value="terceirizado">Outsourced (MSSP)</option><option value="hibrido">Hybrid</option>
                            </select></div>
                    </>
                )}
            </div>
            <div className="step-section">
                <h3 className="step-section-title">{t('step6.securityTraining')}</h3>
                <div className="form-group"><label className="form-label">{t('step6.securityTraining')}</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="treinamento_seguranca" value="sim" checked={formData.treinamento_seguranca === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.yes')}</span></label>
                    <label className="form-check"><input type="radio" name="treinamento_seguranca" value="nao" checked={formData.treinamento_seguranca === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.no')}</span></label>
                </div></div>
            </div>
        </div>
    );
}
