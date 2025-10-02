import StepIndicator from '../StepIndicator';

export default function StepIndicatorExample() {
  return (
    <div className="p-8 bg-background">
      <StepIndicator 
        currentStep={2}
        totalSteps={3}
        stepLabels={['Avatar', 'Name', 'Confirm']}
      />
    </div>
  );
}
