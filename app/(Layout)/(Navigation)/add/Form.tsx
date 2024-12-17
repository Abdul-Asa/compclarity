"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { submitFormData } from "@/app/(Layout)/(Navigation)/add/action";
import { zodResolver } from "@hookform/resolvers/zod";
import { salaryFormSchema } from "@/lib/validation/schema";
import { SalaryFormSchema } from "@/lib/validation/types";
import { currencies, months, years, euCountries } from "@/lib/config";
import { SpinnerButton } from "@/components/Buttons/SpinnerButton";
import { toast } from "@/lib/hooks/useToast";

interface FormProps {
  toggleSalaryChoice: () => void;
}

export const Form = ({ toggleSalaryChoice }: FormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SalaryFormSchema>({
    resolver: zodResolver(salaryFormSchema),
    defaultValues: {
      // @ts-ignore - zod transform
      percentage: [],
      offerType: "",
      offerYear: NaN,
      offerMonth: NaN,
    },
  });

  const { fields, append, remove } = useFieldArray({
    // @ts-ignore - typescript error for this name field.
    name: "percentage",
    control,
  });

  const offerType = watch("offerType");
  const rsu = watch("rsu");

  const onSubmit = async (data: SalaryFormSchema) => {
    // console.log(data)

    if (data.rsu > 0 && data.percentage.length === 0) {
      setError("percentage", {
        message: "Yearly equity percentage cannot be empty",
      });
    } else {
      const res = await submitFormData(data);
      if (res.success) {
        toast({
          title: "Thank you for your submission!",
          description: "Your response has been recorded, it will be published in a few days if it passes our checks.",
          variant: "default",
        });
        reset();
      } else {
        toast({
          title: "Submission failed!",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-[inherit]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white dark:bg-black dark:text-white dark:border dark:border-gray-800  p-8 rounded-lg shadow-md w-full max-w-xl"
      >
        <button
          className="bg-black text-white dark:border py-2 px-4 rounded hover:bg-gray-800 shadow"
          onClick={toggleSalaryChoice}
          type="button"
        >
          {"< Back"}
        </button>

        <div className="text-base">Please fill out the form below to proceed.</div>
        {/* Company */}
        <div>
          <label htmlFor="company" className="block">
            Company:
          </label>
          <input id="company" {...register("company")} className="border w-full" autoComplete="on" />
          {errors.company ? <p className="text-red-500 text-sm mt-1">{errors.company.message}</p> : null}
        </div>

        {/* Location */}
        <div className="flex space-x-4">
          <div className="flex-1">
            <label htmlFor="city" className="block">
              Office City:
            </label>
            <input id="city" {...register("city")} className="border w-full" />
            {errors.city ? <p className="text-red-500 text-sm mt-1">{errors.city.message}</p> : null}
          </div>
          <div className="flex-1">
            <label htmlFor="country" className="block">
              Country:
            </label>
            <select id="countryCode" {...register("countryCode")} className="border w-full dark:bg-black">
              {euCountries.map(({ code, name }) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
            {errors.countryCode ? <p className="text-red-500 text-sm mt-1">{errors.countryCode.message}</p> : null}
          </div>
        </div>

        {/* Arrangement */}
        <div>
          <label htmlFor="arrangement" className="block">
            Arrangement:
          </label>
          <select id="arrangement" {...register("arrangement")} className="border w-full dark:bg-black">
            <option value="">Select an option...</option>
            <option value="In-office">In-office</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        {/* Job Title */}
        <div>
          <label htmlFor="title" className="block">
            Job Title:
          </label>
          <input id="title" {...register("title")} className="border w-full" />
          {errors.title ? <p className="text-red-500 text-sm mt-1">{errors.title.message}</p> : null}
        </div>

        {/* Job Area/Focus */}
        <div>
          <label htmlFor="sector" className="block">
            Job Area/Focus:
          </label>
          <p className="text-sm mt-1 text-gray-500">E.g. Cybersecurity, DevOps or Backend</p>
          <input id="sector" {...register("sector")} className="border w-full" />
        </div>

        {/* Years of Experience and Level */}
        <div className="flex flex-row justify-between items-start space-x-4">
          <div className="flex-1">
            <label htmlFor="yoe" className="block">
              Years of Experience:
            </label>
            <input
              type="number"
              id="yoe"
              {...register("yoe", { valueAsNumber: true })}
              className="border"
              placeholder="Excluding internships"
              onWheel={(event) => event.currentTarget.blur()}
            />
            {errors.yoe ? <p className="text-red-500 text-sm mt-1">{errors.yoe.message}</p> : null}
          </div>

          <div className="flex-1">
            <label htmlFor="level" className="block">
              Level:
            </label>
            <select id="level" {...register("level")} className="border w-full dark:bg-black" defaultValue="">
              <option value="" disabled>
                Select your level
              </option>
              <option value="INTERN">Intern</option>
              <option value="JUNIOR">Junior</option>
              <option value="MID_LEVEL">Mid-level</option>
              <option value="SENIOR">Senior</option>
              <option value="PRINCIPAL">Principal</option>
              <option value="DIRECTOR">Director</option>
            </select>
            {errors.level ? <p className="text-red-500 text-sm mt-1">{errors.level.message}</p> : null}
          </div>
        </div>

        {/* Base Salary */}
        <div>
          <label htmlFor="baseSalary" className="block">
            Base Salary:
          </label>
          <p className="text-sm mt-1 text-gray-500">Annual base salary before tax</p>
          <div className="flex items-center">
            <input
              type="number"
              id="baseSalary"
              {...register("baseSalary", { valueAsNumber: true })}
              className="border"
              onWheel={(event) => event.currentTarget.blur()}
            />
            <select {...register("baseSalaryCurrency")} className="border ml-2 dark:bg-black">
              {currencies.map((currency, index) => (
                <option key={index} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          {errors.baseSalary ? <p className="text-red-500 text-sm mt-1">{errors.baseSalary.message}</p> : null}
        </div>

        {/* Sign-on Bonus */}
        <div>
          <label htmlFor="signOnBonus" className="block">
            Sign-on Bonus:
          </label>
          <p className="text-sm mt-1 text-gray-500">Include all one-off payments such as relocation etc.</p>
          <div className="flex items-center">
            <input
              type="number"
              id="signOnBonus"
              {...register("signOnBonus")}
              placeholder="0"
              className="border"
              onWheel={(event) => event.currentTarget.blur()}
            />
            <select {...register("signOnBonusCurrency")} className="border ml-2 dark:bg-black">
              {currencies.map((currency, index) => (
                <option key={index} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Annual Bonus */}
        <div>
          <label htmlFor="annualBonus" className="block">
            Annual Bonus:
          </label>
          <div className="flex items-center">
            <input
              type="number"
              id="annualBonus"
              {...register("annualBonus")}
              placeholder="0"
              className="border"
              onWheel={(event) => event.currentTarget.blur()}
            />
            <select {...register("annualBonusCurrency", { required: true })} className="border ml-2 dark:bg-black">
              {currencies.map((currency, index) => (
                <option key={index} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Perks */}
        <div>
          <label htmlFor="extra" className="block">
            Perks
          </label>
          <p className="text-sm mt-1 text-gray-500">Benefits such as free food, free gym, corporate housing etc.</p>
          <input id="extra" {...register("extra")} className="border w-full" />
        </div>

        {/* Total Equity */}
        <div>
          <label htmlFor="rsu" className="block">
            Total Equity:
          </label>
          <div className="flex items-center">
            <input
              id="rsu"
              {...register("rsu")}
              type="number"
              placeholder="Total equity amount"
              className="border"
              onWheel={(event) => event.currentTarget.blur()}
            />
            <select {...register("equityCurrency")} className="border ml-2 dark:bg-black">
              {currencies.map((currency, index) => (
                <option key={index} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </div>
          {errors.rsu ? <p className="text-red-500 text-sm mt-1">{errors.rsu.message}</p> : null}
        </div>
        {/* Percentages of equity */}
        {rsu > 0 ? (
          <div>
            <p className="text-sm mt-1 text-gray-500">
              Allocate the percentage of equity per year (needs to add up to 100%):
            </p>
            {errors.percentage ? <p className="text-red-500 text-sm mt-1">{errors.percentage.message}</p> : null}
            {fields.map((field, index) => (
              <div key={field.id}>
                <div className="flex items-center space-x-3 mb-2">
                  <label className="block">{`Year ${index + 1}:`}</label>
                  <input
                    type="number"
                    // @ts-ignore - zod transform
                    {...register(`percentage.${index}`)}
                    placeholder="Percentage"
                    className="border w-1/3"
                    onWheel={(event) => event.currentTarget.blur()}
                  />

                  <button type="button" onClick={() => remove(index)} className="bg-red-500 text-white p-1 rounded">
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <button type="button" onClick={() => append({})} className="mt-2 bg-blue-500 text-white p-1 rounded">
              Add Year
            </button>
          </div>
        ) : null}

        {/* Offer Type */}
        <div>
          <p className="block mb-2">Is your offer new or existing?</p>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input {...register("offerType")} type="radio" value="New" className="mr-2" /> New
            </label>
            <label className="flex items-center">
              <input {...register("offerType")} type="radio" value="Existing" className="mr-2" /> Existing
            </label>
          </div>
          {errors.offerType ? <p className="text-red-500 text-sm mt-1">{errors.offerType.message}</p> : null}
        </div>

        {/* Start Date / Date for which this data is valid */}
        {offerType === "New" || offerType === "Existing" ? (
          <div>
            <p className="block">{offerType === "New" ? "Start date:" : "Date for which this data is valid:"}</p>
            <div className="flex space-x-3">
              <select {...register("offerMonth", { valueAsNumber: true })} className="border">
                <option value="" disabled>
                  Select a month
                </option>
                {months.map((offerMonth) => (
                  <option key={offerMonth.value} value={offerMonth.value}>
                    {offerMonth.label}
                  </option>
                ))}
              </select>
              <select {...register("offerYear", { valueAsNumber: true })} className="border">
                <option value="" disabled>
                  Select a year
                </option>
                {years.map((offerYear) => (
                  <option key={offerYear} value={offerYear}>
                    {offerYear}
                  </option>
                ))}
              </select>
            </div>
            {errors.offerMonth ? <p className="text-red-500 text-sm mt-1">{errors.offerMonth.message}</p> : null}
            {errors.offerYear ? <p className="text-red-500 text-sm mt-1">{errors.offerYear.message}</p> : null}
          </div>
        ) : null}

        {/* Education */}
        <div>
          <label htmlFor="education" className="block">
            Highest Education:
          </label>
          <select id="education" {...register("education")} className="border w-full dark:bg-black">
            <option value="">No response</option>
            <option value="Highschool">High School/Sixth Form</option>
            <option value="Bachelor's">Bachelor&apos;s</option>
            <option value="Master's">Master&apos;s</option>
            <option value="PhD">PhD</option>
          </select>
        </div>

        {/* Gender and Ethnicity */}
        <div className="flex flex-row justify-between items-start space-x-2">
          <div className="flex-1">
            <label htmlFor="gender" className="block">
              Gender:
            </label>
            <select id="gender" {...register("gender")} className="border w-full dark:bg-black">
              <option value="">No response</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="flex-1">
            <label htmlFor="ethnicity" className="block">
              Ethnicity:
            </label>
            <select id="ethnicity" {...register("ethnicity")} className="border w-full dark:bg-black">
              <option value="">No response</option>
              <option value="White">White</option>
              <option value="Asian">Asian</option>
              <option value="Black">Black</option>
              <option value="Hispanic">Hispanic</option>
              <option value="Mixed">Mixed</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Other Info */}
        <div>
          <label htmlFor="other" className="block">
            Any other info you wish to add:
          </label>
          <input id="other" {...register("other")} className="border w-full" placeholder="E.g. Length of internship" />
        </div>

        <div className="flex justify-end">
          <SpinnerButton type="submit" className="px-4 py-2 rounded " name="Submit" state={isSubmitting} />
        </div>
      </form>
    </div>
  );
};
