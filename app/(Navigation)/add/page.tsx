import { AddSalaryChoice } from "@/components/AddSalaryChoice"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "CompClarity - Add Salary",
  description:
    "Contribute your compensation data to the CompClarity database and empower others to make well-informed career decisions!",
}

export default function FormPage() {
  return (
    <>
      {/* <Form /> */}
      <AddSalaryChoice />
    </>
  )
}
