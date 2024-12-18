"use client";
import * as React from "react";
import { defineStepper } from "@stepperize/react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { BookOpen } from "lucide-react";
import { IntroForm } from "./IntroForm";

export const { useStepper, Scoped, steps } = defineStepper(
  { id: "welcome", text: "Welcome", icon: <BookOpen className="size-6" /> }
  // { id: "personal", text: "Personal Info", icon: <User className="size-6" /> },
  // { id: "education", text: "Education", icon: <GraduationCap className="size-6" /> },
  // { id: "experience", text: "Experience", icon: <Briefcase className="size-6" /> },
  // { id: "skills", text: "Skills & CV", icon: <FileText className="size-6" /> }
);

interface StepperItem {
  id: string;
  text: string;
  icon: React.ReactNode;
}

export function OnboardingForm() {
  const stepper = useStepper();

  return (
    <Scoped>
      <Card className="size-full flex flex-col justify-center items-center p-6">
        <Stepper currentStep={stepper.current.id} />

        {stepper.switch({
          welcome: () => <WelcomeComponent />,
          // personal: () => <PersonalInfoComponent />,
          // education: () => <EducationComponent />,
          // experience: () => <ExperienceComponent />,
          // skills: () => <SkillsComponent />,
        })}
      </Card>
    </Scoped>
  );
}

const WelcomeComponent = () => {
  return (
    <div className="w-full max-w-2xl">
      <div className="text-center py-6">
        <h1 className="text-2xl font-bold tracking-tight">Welcome to CompClarity!</h1>
        <p className="text-muted-foreground">Let's get to know you better</p>
      </div>

      <IntroForm />
    </div>
  );
};

const PersonalInfoComponent = () => {
  return <div>Personal Info</div>;
};

const EducationComponent = () => {
  return <div>Education</div>;
};

const ExperienceComponent = () => {
  return <div>Experience</div>;
};

const SkillsComponent = () => {
  return <div>Skills</div>;
};

const Stepper = ({ currentStep }: { currentStep: string }) => {
  const stepper = useStepper();
  const currentStepIndex = stepper.current.index;
  const currentStepInfo = stepper.current;

  return (
    <div className="w-full p-2">
      {/* Mobile view */}
      <div className="flex md:hidden flex-col items-center justify-center gap-2">
        <div className="size-14 rounded-full flex items-center justify-center bg-primary text-white">
          {currentStepInfo.icon}
        </div>
        <span className="text-sm font-medium">{currentStepInfo.text}</span>
      </div>

      {/* Desktop view */}
      <div className="hidden md:flex items-center justify-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div
              className={cn(
                "size-14 rounded-full flex items-center justify-center transition-all duration-500",
                index <= currentStepIndex ? "bg-primary text-white" : "bg-muted"
              )}
            >
              {step.icon}
            </div>
            {index < steps.length - 1 && (
              <div className="w-20 h-1 mx-1 bg-muted relative flex items-center rounded-full">
                <div
                  className="absolute top-0 left-0 h-full bg-primary transition-all duration-500 rounded-full"
                  style={{ width: index < currentStepIndex ? "100%" : "0%" }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
