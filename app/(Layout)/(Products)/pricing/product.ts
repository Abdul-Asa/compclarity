export const pricingTiers = [
  {
    id: "cv-review",
    title: "Member",
    price: 0,
    originalPrice: 0,
    isFree: true,
    discount: "",
    cta: "Join the Discord",
    link: "https://discord.gg/AuAvjpTTnm",
    isAvailable: true,
    features: [
      "Access to latest salaries",
      "Access to job board",
      "Access to job applications tracker",
    ],
    description: "You're already benefiting by just being a member!",
  },
  {
    id: "cv-full-package",
    title: "Premium",
    monthlyPrice: 15,
    yearlyPrice: 150,
    originalMonthlyPrice: 30,
    originalYearlyPrice: 300,
    discount: "50% off - Limited time offer!",
    isFree: false,
    cta: "Get this package",
    isPopular: true,
    isAvailable: true,
    link: "/pricing/cv-full-package",
    features: [
      "Set notifications for new job postings",
      "Full access to CompClarity AI Suite",
      "Generate unlimited CVs and cover letters",
      "Access to AI mock interview prep (coming soon)",
    ],
    description:
      "The best package for those who want to stand out in the job market.",
  },
  {
    id: "stripe-package",
    title: "CompClarity AI Suite",
    monthlyPrice: 15,
    yearlyPrice: 150,
    originalMonthlyPrice: 30,
    originalYearlyPrice: 300,
    discount: "50% off - Limited time offer!",
    isFree: false,
    cta: "Get this package",
    isPopular: true,
    isAvailable: false,
    link: "/cv-generate",
    features: [
      "Set notifications for new job postings",
      "Full access to CompClarity AI Suite",
      "Generate unlimited CVs and cover letters",
      "Access to AI mock interview prep (coming soon)",
    ],
    description:
      "The best package for those who want to stand out in the job market.",
  },
];

export const getTier = (id: string) => {
  return pricingTiers.find((tier) => tier.id === id);
};
