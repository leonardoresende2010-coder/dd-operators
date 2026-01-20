import { useState, useEffect } from 'react';
import { respostasAPI } from '../services/api';
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

const STEPS = [
    { id: 1, title: 'Governança', component: Step1Governanca },
    { id: 2, title: 'Segurança', component: Step2Seguranca },
    { id: 3, title: 'Ciclo de Vida', component: Step3CicloVida },
    { id: 4, title: 'Incidentes', component: Step4Incidentes },
    { id: 5, title: 'SDLC & IA', component: Step5Desenvolvimento },
    { id: 6, title: 'RH & Auditoria', component: Step6RH },
    { id: 7, title: 'Integridade', component: Step7Integridade },
    { id: 8, title: 'Arquivos', component: Step8Upload },
];

export default function Questionario() {
    const [currentStep, setCurrentStep] = useState(1);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [respostas, setRespostas] = useState(null);
    const [formData, setFormData] = useState({ governanca: {}, seguranca: {}, ciclo_vida: {}, incidentes: {}, desenvolvimento: {}, rh: {}, integridade: {} });

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
        } catch (error) { showMessage('danger', 'Erro ao carregar'); }
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
            showMessage('success', 'Salvo!');
        } catch (error) { showMessage('danger', 'Erro ao salvar'); }
        finally { setSaving(false); }
    };

    const nextStep = async () => { await saveCurrentStep(); if (currentStep < STEPS.length) setCurrentStep(currentStep + 1); };
    const prevStep = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

    const finalizarQuestionario = async () => {
        if (!window.confirm('Finalizar questionário?')) return;
        setSaving(true);
        try { await respostasAPI.finalizar(); showMessage('success', 'Finalizado!'); await loadRespostas(); }
        catch (error) { showMessage('danger', 'Erro'); }
        finally { setSaving(false); }
    };

    const reabrirQuestionario = async () => {
        setSaving(true);
        try { await respostasAPI.reabrir(); showMessage('success', 'Reaberto!'); await loadRespostas(); }
        catch (error) { showMessage('danger', 'Erro'); }
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
                    <div className="alert alert-success"><span>✓</span><div><strong>Finalizado</strong><p>Enviado em: {new Date(respostas.data_envio).toLocaleString('pt-BR')}</p><button className="btn btn-sm btn-outline" onClick={reabrirQuestionario} style={{ marginTop: 8 }}>Reabrir</button></div></div>
                )}
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}><h1>Questionário de Due Diligence</h1><p style={{ color: 'var(--neutral-400)' }}>Preencha todas as seções</p></div>
                <Stepper steps={STEPS} currentStep={currentStep} onStepClick={setCurrentStep} />
                <div className="card">
                    <div className="card-header"><h2 className="card-title">Etapa {currentStep}: {STEPS[currentStep - 1].title}</h2><span className="badge badge-primary">{currentStep}/{STEPS.length}</span></div>
                    <div style={{ padding: '1rem 0', minHeight: 400 }}><CurrentStepComponent data={formData} updateData={updateFormData} disabled={isFinalized} /></div>
                    <div className="questionario-actions">
                        <button className="btn btn-secondary" onClick={prevStep} disabled={currentStep === 1 || saving}>← Anterior</button>
                        <button className="btn btn-outline" onClick={saveCurrentStep} disabled={saving || isFinalized}>{saving ? 'Salvando...' : '💾 Salvar'}</button>
                        {currentStep < STEPS.length ? <button className="btn btn-primary" onClick={nextStep} disabled={saving}>Próximo →</button> : <button className="btn btn-success" onClick={finalizarQuestionario} disabled={saving || isFinalized}>✓ Finalizar</button>}
                    </div>
                </div>
            </main>
        </div>
    );
}
