import euCountries from "./european-countries.json" with { type: "json" };

export { euCountries };

export const years = Array.from({ length: 4 }, (_, index) => new Date().getFullYear() + 1 - index);

export const months = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

export const currencies = Array.from(new Set(euCountries.map((country) => country.currency)));

export const educationOptions = [
  { label: "Prefer not to say", value: "n/a" },
  {
    label: "Secondary education (A-Levels, GCSEs, etc.)",
    value: "Secondary education (A-Levels, GCSEs, etc.)",
  },
  { label: "Bachelor's degree", value: "Bachelor's degree" },
  { label: "Master's degree", value: "Master's degree" },
  { label: "Postgraduate degree (PhD)", value: "Postgraduate degree (PhD)" },
  { label: "Other", value: "Other" },
];

export const genderOptions = [
  { label: "Prefer not to say", value: "n/a" },
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];

export const ethnicityOptions = [
  { label: "Prefer not to say", value: "n/a" },
  { label: "White", value: "White" },
  {
    label: "Mixed or multiple ethnic groups",
    value: "Mixed or multiple ethnic groups",
  },
  { label: "Asian ", value: "Asian " },
  { label: "Black", value: "Black" },
  { label: "Hispanic", value: "Hispanic" },
  { label: "Arab", value: "Arab" },
  { label: "Other ethnic group", value: "Other ethnic group" },
];

export const defaultColumns = [
  {
    id: "0",
    title: "Applied",
  },
  {
    id: "1",
    title: "Screen",
  },
  {
    id: "2",
    title: "Interview",
  },
  {
    id: "3",
    title: "Offer",
  },
  {
    id: "4",
    title: "Rejected",
  },
];

export const todoLevelVerbs = {
  "0": { verb: "applied", dateKey: "date_applied", dateLabel: "Apply" },
  "1": { verb: "screened", dateKey: "date_screened", dateLabel: "Screen" },
  "2": {
    verb: "interviewed",
    dateKey: "date_interviewed",
    dateLabel: "Interview",
  },
  "3": { verb: "offered", dateKey: "date_offered", dateLabel: "Offer" },
  "4": { verb: "rejected", dateKey: "date_rejected", dateLabel: "Reject" },
};
