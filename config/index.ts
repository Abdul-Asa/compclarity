export const years = Array.from(
  { length: 4 },
  (_, index) => new Date().getFullYear() + 1 - index
);

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

export const currencies = [
  "GBP",
  "EUR",
  "USD",
  "BGN",
  "CHF",
  "CZK",
  "DKK",
  "PLN",
  "RON",
  "SEK",
  "HUF",
];

export const euCountries = [
  { code: "GB", name: "United Kingdom" },
  { code: "AT", name: "Austria" },
  { code: "BE", name: "Belgium" },
  { code: "CZ", name: "Czech Republic" },
  { code: "DK", name: "Denmark" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
  { code: "GR", name: "Greece" },
  { code: "HU", name: "Hungary" },
  { code: "IE", name: "Ireland" },
  { code: "IT", name: "Italy" },
  { code: "NL", name: "Netherlands" },
  { code: "NO", name: "Norway" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "RO", name: "Romania" },
  { code: "RU", name: "Russia" },
  { code: "ES", name: "Spain" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "OT", name: "Other (specify in City)" },
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
