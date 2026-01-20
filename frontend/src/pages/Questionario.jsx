import { useState, useEffect } from 'react';
import { respostasAPI } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import Header from '../components/Header';
import Stepper from '../components/Stepper';
import Step1Governanca from '../components/steps/Step1Governanca';
import Step2Seguranca from '../components/steps/Step2Seguranca';
import Step3CicloVida from '../components/steps/Step3CicloVida';
import Step4Incidentes from '../components/steps/Step4Incidentes';
import Step5Desenvolvimento from '../components/steps/Step6Desenvolvimento';
import Step6RH from '../components/steps/Step7RH';
import Step7Integridade from '../components/steps/Step8Integridade';
import Step8Upload from '../components/steps/Step9Upload';

export default function Questionario() {
    const { t } = useLanguage();
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [respostas, setRespostas] = useState(null);
    const [formData, setFormData] = useState({ governanca: {}, seguranca: {}, ciclo_vida: {}, incidentes: {}, desenvolvimento: {}, rh: {}, integridade: {} });

    const STEPS = [
        { id: 1, key: 'governance', title: t('steps.governance'), component: Step1Governanca },
        { id: 2, key: 'security', title: t('steps.security'), component: Step2Seguranca },
        { id: 3, key: 'lifecycle', title: t('steps.lifecycle'), component: Step3CicloVida },
        { id: 4, key: 'incidents', title: t('steps.incidents'), component: Step4Incidentes },
        { id: 5, key: 'development', title: t('steps.development'), component: Step5Desenvolvimento },
        { id: 6, key: 'hr', title: t('steps.hr'), component: Step6RH },
        { id: 7, key: 'integrity', title: t('steps.integrity'), component: Step7Integridade },
        { id: 8, key: 'upload', title: t('steps.upload'), component: Step8Upload },
    ];

    useEffect(() => { loadRespostas(); }, []);

    const loadRespostas = async () => {
        try {
            const data = await respostasAPI.get();
            setRespostas(data);
            setFormData({
                governanca: data.secao_1_governanca || {}, seguranca: data.secao_2_seguranca || {},
                ciclo_vida: data.secao_3_ciclo_vida || {}, incidentes: data.secao_4_incidentes || {},
                desenvolvimento: data.secao_6_desenvolvimento || {},
                rh: data.secao_7_rh || {}, integridade: data.secao_9_integridade || {}
            });
        } catch (error) { showMessage('danger', t('questionnaire.errorLoad')); }
        finally { setLoading(false); }
    };

    const showMessage = (type, text) => { setMessage({ type, text }); setTimeout(() => setMessage({ type: '', text: '' }), 5000); };
    const updateFormData = (section, data) => setFormData(prev => ({ ...prev, [section]: { ...prev[section], ...data } }));

    const saveCurrentStep = async () => {
        setSaving(true);
        try {
            const sectionMap = { 1: 'governanca', 2: 'seguranca', 3: 'ciclo_vida', 4: 'incidentes', 5: 'desenvolvimento', 6: 'rh', 7: 'integridade' };
            const section = sectionMap[currentStep];
            if (section) await respostasAPI.saveSecao(currentStep, formData[section]);
            showMessage('success', t('questionnaire.successSaved'));
        } catch (error) { showMessage('danger', t('questionnaire.errorSave')); }
        finally { setSaving(false); }
    };

    const nextStep = async () => { await saveCurrentStep(); if (currentStep < STEPS.length) setCurrentStep(currentStep + 1); };
    const prevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

    const finalizarQuestionario = async () => {
        const confirmMsg = t('questionnaire.finalize') + '?';
        if (!window.confirm(confirmMsg)) return;
        setSaving(true);
        try { await respostasAPI.finalizar(); showMessage('success', t('questionnaire.successFinalized')); await loadRespostas(); }
        catch (error) { showMessage('danger', t('questionnaire.errorFinalize')); }
        finally { setSaving(false); }
    };

    const reabrirQuestionario = async () => {
        setSaving(true);
        try { await respostasAPI.reabrir(); showMessage('success', 'OK'); await loadRespostas(); }
        catch (error) { showMessage('danger', t('common.error')); }
        finally { setSaving(false); }
    };

    const isFinalized = respostas?.status_submissao === 'finalizado';
    const CurrentStepComponent = STEPS[currentStep - 1].component;

    if (loading) return <div className="app-container"><Header /><div className="loading-overlay" style={{ position: 'relative', background: 'transparent' }}><div className="loading-spinner"></div></div></div>;

    return (
        <div className="app-container">
            <Header />
            <main className="main-content">
                {message.text && <div className={`alert alert-${message.type}`}><span>{message.type === 'success' ? '✓' : '⚠️'}</span><span>{message.text}</span></div>}
                {isFinalized && (
                    <div className="alert alert-success"><span>✓</span><div><strong>{t('questionnaire.finalize')}</strong><p>{t('questionnaire.sent')}: {new Date(respostas.data_envio).toLocaleString()}</p><button className="btn btn-sm btn-outline" onClick={reabrirQuestionario} style={{ marginTop: 8 }}>{t('questionnaire.reopen')}</button></div></div>
                )}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}><h1>{t('questionnaire.title')}</h1><p style={{ color: 'var(--neutral-400)' }}>{t('questionnaire.subtitle')}</p></div>
                <Stepper steps={STEPS} currentStep={currentStep} onStepClick={setCurrentStep} />
                <div className="card">
                    <div className="card-header"><h2 className="card-title">{t('questionnaire.step')} {currentStep}: {STEPS[currentStep - 1].title}</h2><span className="badge badge-primary">{currentStep}/{STEPS.length}</span></div>
                    <div style={{ padding: '1rem 0', minHeight: 400 }}><CurrentStepComponent data={formData} updateData={updateFormData} disabled={isFinalized} /></div>
                    <div className="questionario-actions">
                        <button className="btn btn-secondary" onClick={prevStep} disabled={currentStep === 1 || saving}>← {t('questionnaire.previous')}</button>
                        <button className="btn btn-outline" onClick={saveCurrentStep} disabled={saving || isFinalized}>{saving ? t('questionnaire.saving') : '💾 ' + t('common.save')}</button>
                        {currentStep < STEPS.length ? <button className="btn btn-primary" onClick={nextStep} disabled={saving}>{t('questionnaire.next')} →</button> : <button className="btn btn-success" onClick={finalizarQuestionario} disabled={saving || isFinalized}>✓ {t('questionnaire.finalize')}</button>}
                    </div>
                </div>
            </main>
        </div>
    );
}
