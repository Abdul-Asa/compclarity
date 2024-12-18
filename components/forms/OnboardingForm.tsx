"use client";
import * as React from "react";
import { defineStepper } from "@stepperize/react";
import { Card, CardHeader, CardTitle } from "../ui/card";

const { useStepper } = defineStepper(
  { id: "welcome", label: "Welcome" },
  { id: "personal", label: "Personal Info" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills & CV" }
);

export function OnboardingForm() {
  const stepper = useStepper();

  return <Card className="size-full max-w-xl max-h-"> hello</Card>;
}

const WelcomeComponent = () => {
  return <p>Hello</p>;
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
