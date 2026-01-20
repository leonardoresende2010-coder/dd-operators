import { useLanguage } from '../../context/LanguageContext';

export default function Step8Integridade({ data, updateData, disabled }) {
    const { t } = useLanguage();
    const formData = data.integridade || {};
    const handleChange = (e) => { const { name, value } = e.target; updateData('integridade', { [name]: value }); };

    return (
        <div>
            <div className="step-section">
                <h3 className="step-section-title">{t('step7.title')}</h3>
                <div className="form-group"><label className="form-label required">RNG Certification?</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="rng_certificado" value="sim" checked={formData.rng_certificado === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.yes')}</span></label>
                    <label className="form-check"><input type="radio" name="rng_certificado" value="nao" checked={formData.rng_certificado === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.no')}</span></label>
                    <label className="form-check"><input type="radio" name="rng_certificado" value="na" checked={formData.rng_certificado === 'na'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">N/A</span></label>
                </div></div>
                {formData.rng_certificado === 'sim' && (
                    <div className="form-row">
                        <div className="form-group"><label className="form-label">Certifying entity</label><input type="text" name="rng_certificadora" className="form-input" placeholder="E.g.: eCOGRA, GLI, BMM" value={formData.rng_certificadora || ''} onChange={handleChange} disabled={disabled} /></div>
                        <div className="form-group"><label className="form-label">Certification date</label><input type="date" name="rng_data" className="form-input" value={formData.rng_data || ''} onChange={handleChange} disabled={disabled} /></div>
                    </div>
                )}
            </div>
            <div className="step-section">
                <h3 className="step-section-title">Security Certifications</h3>
                <div className="form-group"><label className="form-label">Certifications held</label><textarea name="certificacoes" className="form-textarea" placeholder="E.g.: ISO 27001, SOC 2 Type II, PCI DSS..." value={formData.certificacoes || ''} onChange={handleChange} disabled={disabled} /></div>
            </div>
            <div className="step-section">
                <h3 className="step-section-title">Data Portability & Exit</h3>
                <div className="form-group"><label className="form-label required">Allows data export (portability)?</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="portabilidade" value="sim" checked={formData.portabilidade === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.yes')}</span></label>
                    <label className="form-check"><input type="radio" name="portabilidade" value="nao" checked={formData.portabilidade === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.no')}</span></label>
                </div></div>
                <div className="form-group"><label className="form-label required">Full account deletion (right to be forgotten)?</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="exclusao_completa" value="sim" checked={formData.exclusao_completa === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.yes')}</span></label>
                    <label className="form-check"><input type="radio" name="exclusao_completa" value="nao" checked={formData.exclusao_completa === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.no')}</span></label>
                </div></div>
                <div className="form-group"><label className="form-label">Additional notes</label><textarea name="observacoes" className="form-textarea" placeholder="Additional information..." value={formData.observacoes || ''} onChange={handleChange} disabled={disabled} /></div>
            </div>
        </div>
    );
}
