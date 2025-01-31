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
      <Card className="flex flex-col items-center justify-center p-6 size-full">
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
      <div className="py-6 text-center">
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
  // const currentStepIndex = stepper.current.index;
  const currentStepInfo = stepper.current;

  return (
    <div className="w-full p-2">
      {/* Mobile view */}
      <div className="flex flex-col items-center justify-center gap-2 md:hidden">
        <div className="flex items-center justify-center text-white rounded-full size-14 bg-primary">
          {currentStepInfo.icon}
        </div>
        <span className="text-sm font-medium">{currentStepInfo.text}</span>
      </div>

      {/* Desktop view */}
      {/* <div className="items-center justify-center hidden md:flex">
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
            {/* {index < steps.length - 1 && (
              <div className="relative flex items-center w-20 h-1 mx-1 rounded-full bg-muted">
                <div
                  className="absolute top-0 left-0 h-full transition-all duration-500 rounded-full bg-primary"
                  style={{ width: index < currentStepIndex ? "100%" : "0%" }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div> */}
    </div>
  );
};
