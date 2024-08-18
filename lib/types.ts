import { z } from "zod";
import {
  createApplicationSchema,
  forgotPasswordSchema,
  loginFormSchema,
  resetPasswordSchema,
  salaryFormSchema,
  signUpFormSchema,
  updateApplicationSchema,
  updateUserSchema,
} from "@/lib/validations/form";
import countryToCurrency from "country-to-currency";
import { Database } from "./supabase/types";

export type CurrencyCode =
  (typeof countryToCurrency)[keyof typeof countryToCurrency];

type Company = {
  name: string;
  domain: string;
};

type Offer = {
  rowId: string;
  verified: boolean;
  addedDate: Date;
  company: Company;
  title: string;
  city: string;
  countryCode: string;
  level: string;
  gender: string | undefined;
  ethnicity: string | undefined;
  other: string | undefined;
  arrangement: string | undefined;
  yoe: number;
  sector: string | undefined;
  education: string | undefined;
  extra: string | undefined;
  rsu: number;
  averageRsu: number;
  offerYear: number;
  baseSalaryCurrency: CurrencyCode;
  signOnBonusCurrency: CurrencyCode;
  annualBonusCurrency: CurrencyCode;
  equityCurrency: CurrencyCode;
  normTotalComp: number;
  displayedTotalComp: number;
  baseSalary: number;
  signOnBonus: number;
  annualBonus: number;
  vestingPeriod: number;
  percentage: string | undefined;
  compDetails: {
    totalComp: string;
    base: string;
    signOnBonus: string;
    annualBonus: string;
    averageRsu: string;
  };
};

type Job = {
  title: string;
  description: string;
  city: string;
  countryCode: string;
  company: Company;
  level: string;
  addedDate: Date;
  jobId: string;
  link: string;
  industry: string;
}

type JobsApiResponse = {
  jobs: Job[];
  totalResults: number;
};

type OfferApiResponse = {
  offers: Offer[];
  totalResults: number;
};

export type { Offer, Company, OfferApiResponse, Job, JobsApiResponse };

export type Func<T = any> = (...args: T[]) => any;

export type SalaryFormSchema = z.infer<typeof salaryFormSchema>;
export type SignUpFormSchema = z.infer<typeof signUpFormSchema>;
export type LoginFormSchema = z.infer<typeof loginFormSchema>;
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type AuthFormSchema =
  | SignUpFormSchema
  | LoginFormSchema
  | ForgotPasswordSchema;
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
export type UpdateUserSchema = z.infer<typeof updateUserSchema>;
export type CreateApplicationSchema = z.infer<typeof createApplicationSchema>;
export type UpdateApplicationSchema = z.infer<typeof updateApplicationSchema>;
export type ApplicationObject = Database["public"]["Tables"]["todos"]["Row"];
export type ApplicationSorted = Record<string, ApplicationObject[]>;
