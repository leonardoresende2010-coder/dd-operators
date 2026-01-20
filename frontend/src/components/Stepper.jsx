export default function Stepper({ steps, currentStep, onStepClick }) {
    return (
        <div className="stepper">
            {steps.map((step, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === currentStep;
                const isCompleted = stepNumber < currentStep;
                return (
                    <div key={step.id} className={`stepper-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`} onClick={() => onStepClick(stepNumber)}>
                        <div className="stepper-circle">{isCompleted ? '✓' : stepNumber}</div>
                        <span className="stepper-label">{step.title}</span>
                    </div>
                );
            })}
        </div>
    );
}
