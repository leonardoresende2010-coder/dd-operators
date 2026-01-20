import { useLanguage } from '../../context/LanguageContext';

export default function Step4Incidentes({ data, updateData, disabled }) {
    const { t } = useLanguage();
    const formData = data.incidentes || {};
    const handleChange = (e) => { const { name, value } = e.target; updateData('incidentes', { [name]: value }); };

    return (
        <div>
            <div className="step-section">
                <h3 className="step-section-title">{t('step4.title')}</h3>
                <div className="form-group"><label className="form-label required">{t('step4.plan')}</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="plano_documentado" value="sim" checked={formData.plano_documentado === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.yes')}</span></label>
                    <label className="form-check"><input type="radio" name="plano_documentado" value="nao" checked={formData.plano_documentado === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.no')}</span></label>
                </div></div>
            </div>
            <div className="step-section">
                <h3 className="step-section-title">Business Continuity</h3>
                <div className="form-row">
                    <div className="form-group"><label className="form-label required">{t('step4.rto')}</label>
                        <select name="rto" className="form-select" value={formData.rto || ''} onChange={handleChange} disabled={disabled}>
                            <option value="">{t('common.select')}...</option><option value="1h">Up to 1 hour</option><option value="4h">Up to 4 hours</option><option value="8h">Up to 8 hours</option><option value="24h">Up to 24 hours</option>
                        </select><span className="form-hint">Max downtime allowed</span></div>
                    <div className="form-group"><label className="form-label required">{t('step4.rpo')}</label>
                        <select name="rpo" className="form-select" value={formData.rpo || ''} onChange={handleChange} disabled={disabled}>
                            <option value="">{t('common.select')}...</option><option value="0">Zero (real-time)</option><option value="1h">Up to 1 hour</option><option value="4h">Up to 4 hours</option><option value="24h">Up to 24 hours</option>
                        </select><span className="form-hint">Max data loss allowed</span></div>
                </div>
            </div>
            <div className="step-section">
                <h3 className="step-section-title">Team & Insurance</h3>
                <div className="form-group"><label className="form-label">{t('step4.csirt')}</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="csirt_existe" value="sim" checked={formData.csirt_existe === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.yes')}</span></label>
                    <label className="form-check"><input type="radio" name="csirt_existe" value="nao" checked={formData.csirt_existe === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.no')}</span></label>
                </div></div>
                <div className="form-group"><label className="form-label">{t('step4.insurance')}</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="seguro_cyber" value="sim" checked={formData.seguro_cyber === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.yes')}</span></label>
                    <label className="form-check"><input type="radio" name="seguro_cyber" value="nao" checked={formData.seguro_cyber === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.no')}</span></label>
                </div></div>
            </div>
        </div>
    );
}
