import { LucideIcon } from 'lucide-react';

interface Step {
  id: number;
  title: string;
  icon: React.ReactNode;
}

interface StepIndicatorsProps {
  steps: Step[];
  currentStep: number;
}

export default function StepIndicators({ steps, currentStep }: StepIndicatorsProps) {
  return (
    <div className="flex space-x-6">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={`flex items-center ${
            index === currentStep ? 'text-blue-600 font-semibold' : 'text-gray-500'
          }`}
        >
          {step.icon}
          <span className="ml-2">{step.title}</span>
          {index < steps.length - 1 && (
            <span className="ml-4 text-gray-300">→</span>
          )}
        </div>
      ))}
    </div>
  );
}