
import React, { useState, useEffect } from "react";
import "./CheckoutProcess.css";
import { TiTick } from "react-icons/ti";
import { Icon } from "@iconify/react";


interface StepperProps {
  currentStage: number;
}

const Stepper: React.FC<StepperProps> = ({ currentStage }) => {
  const steps = [
    { label: "Select Location", icon: <Icon className="icon" icon="ic:baseline-add-location-alt" height={28} /> },
    { label: "Service Selection", icon: <Icon className="icon" icon="bi:buildings" height={24} /> },
    { label: "Export Option", icon: <Icon className="icon" icon="mingcute:file-export-fill" height={26} /> },
    { label: "Contact Details", icon: <Icon className="icon" icon="ri:contacts-book-3-fill" height={26} /> },
    { label: "Confirmation", icon: <Icon className="icon" icon="mdi:account-multiple-success-outline" height={26} /> },
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setCurrentStep(currentStage);
    setComplete(currentStage === steps.length);
  }, [currentStage, steps.length]);

  return (
    <>
      <div className="flex justify-between">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            } `}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : step.icon}
            </div>
            <p className="text-gray-500">{step.label}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4">
      </div>
    </>
  );
};

export default Stepper;
