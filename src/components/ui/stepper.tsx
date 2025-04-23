"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, Pencil } from 'lucide-react';

// Define the Step interface
interface Step {
    id: number;
    title: string;
    icon: React.ReactNode;
    path: string;
}

interface StepperNavigationProps {
    activeStep: number;
    steps: Step[];
    onNext: () => void;
    onPrevious: () => void;
    isNextEnabled: boolean;
}



// StepperHeader Component
export function StepperHeader({
    steps,
    activeStep
}: {
    steps: Step[];
    activeStep: number;
}) {
    return (
        <div className="flex flex-col items-center mb-6">
            {/* Icon row with background line */}
            <div className="relative w-full" style={{ height: '40px' }}>
                {/* Background line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 transform -translate-y-1/2" />
                {/* Icons */}
                <div className="relative flex justify-between items-center h-full">
                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className={`
                  flex items-center justify-center 
                  w-10 h-10 rounded-full 
                  ${activeStep === index ? 'bg-blue-500 text-white' : 'bg-gray-300 text-white'}
                `}
                        >
                            {step.icon}
                        </div>
                    ))}
                </div>
            </div>
            {/* Titles */}
            <div className="flex justify-between w-full mt-2">
                {steps.map((step) => (
                    <span key={step.id} className="text-sm font-bold uppercase text-gray-700">
                        {step.title}
                    </span>
                ))}
            </div>
        </div>
    );
}

// StepperNavigation Component
export function StepperNavigation({
    activeStep,
    steps,
    onNext,
    onPrevious,
    isNextEnabled,
}: StepperNavigationProps) {
    const isFirstStep = activeStep === 0;
    const isLastStep = activeStep === steps.length - 1;

    return (
        <div className="flex justify-between mt-6">
            <Button
                variant="outline"
                onClick={onPrevious}
                disabled={isFirstStep}
                className="flex items-center"
            >
                <ChevronLeft className="mr-2 w-4 h-4" />
                Previous
            </Button>
            <Button
                onClick={onNext}
                disabled={!isNextEnabled}
                className="flex items-center"
            >
                {isLastStep ? 'Submit' : 'Next'}
                <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
        </div>
    );
}

// Main Stepper Component
export function Stepper({
    children,
    steps,
    onSubmit
}: {
    children: React.ReactNode;
    steps: Step[];
    onSubmit?: () => void;
}) {
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(prev => prev + 1);
        } else {
            onSubmit?.();
        }
    };

    const handlePrevious = () => {
        if (activeStep > 0) {
            setActiveStep(prev => prev - 1);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6">
            <StepperHeader
                steps={steps}
                activeStep={activeStep}
            />
            {React.Children.toArray(children)[activeStep]}
            <StepperNavigation
                isNextEnabled={true}
                activeStep={activeStep}
                steps={steps}
                onNext={handleNext}
                onPrevious={handlePrevious}
            />
        </div>
    );
}