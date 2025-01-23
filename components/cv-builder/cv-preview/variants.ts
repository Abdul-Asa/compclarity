import { cva } from "class-variance-authority"

export const paperVariants = cva(
  "relative bg-white mx-auto my-8", 
  {
    variants: {
      template: {
        classic: "border p-8 border-gray-200 shadow-2xl shadow-slate-700/10 ring-1 ring-gray-900/5",
        modern: "p-6 shadow-lg rounded-lg",
        minimal: "p-4 border border-gray-100",
      },
      size: {
        a4: "w-[210mm] h-[297mm]",
        letter: "w-[216mm] h-[279mm]",
      }
    },
    defaultVariants: {
      template: "classic",
      size: "a4"
    }
  }
)

export const sectionVariants = cva(
  "mb-6", 
  {
    variants: {
      template: {
        classic: "border-b border-gray-200 pb-4",
        modern: "rounded-md bg-gray-50 p-4",
        minimal: "border-l-4 border-gray-200 pl-4",
      }
    },
    defaultVariants: {
      template: "classic"
    }
  }
) 