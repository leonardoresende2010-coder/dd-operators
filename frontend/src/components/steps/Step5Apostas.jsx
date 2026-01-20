export default function Step5Apostas({ data, updateData, disabled }) {
    const formData = data.apostas || {};
    const handleChange = (e) => { const { name, value } = e.target; updateData('apostas', { [name]: value }); };

    return (
        <div>
            <div className="step-section">
                <h3 className="step-section-title">Verificação de Identidade (KYC)</h3>
                <div className="form-group"><label className="form-label required">Realiza KYC?</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="kyc_implementado" value="sim" checked={formData.kyc_implementado === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Sim</span></label>
                    <label className="form-check"><input type="radio" name="kyc_implementado" value="nao" checked={formData.kyc_implementado === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Não</span></label>
                </div></div>
                {formData.kyc_implementado === 'sim' && (
                    <>
                        <div className="form-group"><label className="form-label required">Fornecedor de biometria</label><input type="text" name="kyc_fornecedor" className="form-input" placeholder="Ex: Facematch, iProov" value={formData.kyc_fornecedor || ''} onChange={handleChange} disabled={disabled} /></div>
                        <div className="form-group"><label className="form-label required">Como é garantida a veracidade da biometria?</label><textarea name="kyc_veracidade_biometria" className="form-textarea" placeholder="Descreva prova de vida, detecção de deepfakes..." value={formData.kyc_veracidade_biometria || ''} onChange={handleChange} disabled={disabled} /></div>
                    </>
                )}
            </div>
            <div className="step-section">
                <h3 className="step-section-title">Prevenção à Lavagem (PLD/AML)</h3>
                <div className="form-group"><label className="form-label required">Possui programa PLD/AML?</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="aml_programa" value="sim" checked={formData.aml_programa === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Sim</span></label>
                    <label className="form-check"><input type="radio" name="aml_programa" value="nao" checked={formData.aml_programa === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Não</span></label>
                </div></div>
            </div>
            <div className="step-section">
                <h3 className="step-section-title">Logs e Reportes Regulatórios</h3>
                <div className="form-group"><label className="form-label required">Mantém logs para órgãos reguladores?</label><div className="radio-group-horizontal">
                    <label className="form-check"><input type="radio" name="logs_transacoes" value="sim" checked={formData.logs_transacoes === 'sim'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Sim</span></label>
                    <label className="form-check"><input type="radio" name="logs_transacoes" value="nao" checked={formData.logs_transacoes === 'nao'} onChange={handleChange} disabled={disabled} className="form-check-input" /><span className="form-check-label">Não</span></label>
                </div></div>
                <div className="form-group"><label className="form-label">Órgãos para os quais reporta</label><textarea name="orgaos_reporte" className="form-textarea" placeholder="Ex: SPA, Ministério da Fazenda, COAF..." value={formData.orgaos_reporte || ''} onChange={handleChange} disabled={disabled} /></div>
            </div>
        </div>
    );
}
