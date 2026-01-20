import { useLanguage } from '../../context/LanguageContext';

export default function Step2Seguranca({ data, updateData, disabled }) {
    const { t } = useLanguage();
    const formData = data.seguranca || {};
    const handleChange = (e) => { const { name, value, type, checked } = e.target; updateData('seguranca', { [name]: type === 'checkbox' ? checked : value }); };

    return (
        <div>
            <div className="step-section">
                <h3 className="step-section-title">{t('step2.title')}</h3>
                <div className="form-row">
                    <div className="form-group"><label className="form-label required">{t('step2.encryption')}</label>
                        <select name="criptografia_repouso" className="form-select" value={formData.criptografia_repouso || ''} onChange={handleChange} disabled={disabled}>
                            <option value="">{t('common.select')}...</option><option value="AES-256">AES-256</option><option value="AES-128">AES-128</option><option value="outro">Other</option><option value="nenhum">None</option>
                        </select></div>
                    <div className="form-group"><label className="form-label required">{t('step2.encryptionTransit')}</label>
                        <select name="criptografia_transito" className="form-select" value={formData.criptografia_transito || ''} onChange={handleChange} disabled={disabled}>
                            <option value="">{t('common.select')}...</option><option value="TLS-1.3">TLS 1.3</option><option value="TLS-1.2">TLS 1.2</option>
                        </select></div>
                </div>
            </div>
            <div className="step-section">
                <h3 className="step-section-title">{t('step2.mfa')}</h3>
                <div className="form-group"><label className="form-label required">{t('step2.mfa')}</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="mfa_implementado" value="sim" checked={formData.mfa_implementado === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.yes')}</span></label>
                    <label className="form-check"><input type="radio" name="mfa_implementado" value="nao" checked={formData.mfa_implementado === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.no')}</span></label>
                </div></div>
            </div>
            <div className="step-section">
                <h3 className="step-section-title">{t('step2.pentest')}</h3>
                <div className="form-group"><label className="form-label required">{t('step2.pentest')}</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="pentest_regular" value="sim" checked={formData.pentest_regular === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.yes')}</span></label>
                    <label className="form-check"><input type="radio" name="pentest_regular" value="nao" checked={formData.pentest_regular === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">{t('common.no')}</span></label>
                </div></div>
                {formData.pentest_regular === 'sim' && (
                    <div className="form-row">
                        <div className="form-group"><label className="form-label">{t('step2.pentestFrequency')}</label><select name="pentest_frequencia" className="form-select" value={formData.pentest_frequencia || ''} onChange={handleChange} disabled={disabled}><option value="">{t('common.select')}...</option><option value="mensal">{t('step2.monthly')}</option><option value="trimestral">{t('step2.quarterly')}</option><option value="semestral">{t('step2.semiannual')}</option><option value="anual">{t('step2.annual')}</option></select></div>
                        <div className="form-group"><label className="form-label">Last pentest</label><input type="date" name="pentest_ultima_data" className="form-input" value={formData.pentest_ultima_data || ''} onChange={handleChange} disabled={disabled} /></div>
                    </div>
                )}
            </div>
        </div>
    );
}
