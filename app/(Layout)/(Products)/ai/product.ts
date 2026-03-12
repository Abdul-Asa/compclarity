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
    features: ["Access to latest salaries", "Access to job board", "Access to job applications tracker"],
    description: "You're already benefiting by just being a member!",
  },
  {
    id: "ai-suite",
    title: "AI Suite",
    price: 0,
    originalPrice: 0,
    isFree: true,
    discount: "",
    cta: "Get Started",
    link: "/cv-generate",
    isAvailable: true,
    features: [
      "Set notifications for new job postings",
      "Full access to CompClarity AI Suite",
      "Generate unlimited CVs and cover letters",
      "Access to AI mock interview prep (coming soon)",
    ],
    description: "All features free. Perfect for students and professionals.",
  },
];

export const getTier = (id: string) => {
  return pricingTiers.find((tier) => tier.id === id);
};
