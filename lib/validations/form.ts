import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

// Form validation schemas

export const salaryFormSchema = z.object({
  company: z
    .string()
    .min(1, { message: "Company name cannot be empty" })
    .max(100, { message: "Company name cannot exceed 100 characters" }),
  arrangement: z.string(),
  city: z.string().min(1, { message: "City cannot be empty" }),
  countryCode: z.string().min(1, "Country cannot be empty"),
  title: z.string().min(1, { message: "Title cannot be empty" }),
  sector: z.string(),
  yoe: z.number({ invalid_type_error: "YOE cannot be empty" }),
  level: z.string().min(1, "Level cannot be empty"),
  baseSalary: z.number({ invalid_type_error: "Base salary cannot be empty" }),
  baseSalaryCurrency: z.string().min(1),
  signOnBonus: z.coerce.number(),
  signOnBonusCurrency: z.string().min(1),
  annualBonus: z.coerce.number(),
  annualBonusCurrency: z.string().min(1),
  extra: z.string(),
  rsu: z.coerce.number(),
  equityCurrency: z.string().min(1),
  percentage: z
    .array(
      z.coerce
        .number({ invalid_type_error: "Value must be between 1 and 100" })
        .refine((value) => value > 0 && value <= 100, {
          message: "Value must be between 1 and 100",
        })
    )
    .transform((percentage) => percentage.join(",")),
  offerType: z.string().min(1, { message: "Choose one" }),
  offerMonth: z
    .number({ invalid_type_error: "Please specify the month" })
    .min(1, { message: "Please specify the month" }),
  offerYear: z.number({ invalid_type_error: "Please specify the year" }).min(1, { message: "Please specify the year" }),
  education: z.string(),
  gender: z.string(),
  ethnicity: z.string(),
  other: z.string(),
});

export const signUpFormSchema = z.object({
  firstName: z.string().min(1, { message: "First name cannot be empty" }),
  lastName: z.string().min(1, { message: "Last name cannot be empty" }),
  email: z.string().email(),
  password: z.string().min(6, { message: "Password must have a length of at least 6." }),
});

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Password must have a length of at least 6." }),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(6, { message: "Password must have a length of at least 6." }),
  confirmPassword: z.string().min(6, { message: "Password must have a length of at least 6." }),
});

export const updateUserSchema = z.object({
  firstName: z.string().min(1, { message: "First name cannot be empty" }),
  lastName: z.string().min(1, { message: "Last name cannot be empty" }),
});

export const createApplicationSchema = z.object({
  companyName: z.string().min(1, { message: "Company name cannot be empty" }),
  title: z.string().min(1, { message: "Title cannot be empty" }),
  dateApplied: z.string().min(1, { message: "Date of application cannot be empty" }),
  location: z.string().min(1, { message: "Location cannot be empty" }),
  description: z.string().optional(),
});

export const updateApplicationSchema = z.object({
  companyName: z.string().min(1, { message: "Company name cannot be empty" }),
  title: z.string().min(1, { message: "Title cannot be empty" }),
  location: z.string().min(1, { message: "Location cannot be empty" }),
  description: z.string().optional(),
  dateScreened: z.string().optional(),
  dateApplied: z.string().optional(),
  dateInterviewed: z.string().optional(),
  dateOffered: z.string().optional(),
  dateRejected: z.string().optional(),
});

export const cvServiceSchema = z.object({
  firstName: z.string().min(3, { message: "Minimum 3 characters" }),
  lastName: z.string().min(3, { message: "Minimum 3 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z
    .string()
    .min(1, { message: "Phone number is required" })
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  cvFile: z.array(z.instanceof(File)).refine((files) => files.length > 0),
  extraInformation: z.string().optional(),
  service: z.enum(["cv-writing", "cv-full-package"]),
});
