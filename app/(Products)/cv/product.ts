export const pricingTiers = [
  {
    id: "cv-review",
    title: "CV Review",
    price: 0,
    originalPrice: 0,
    isFree: true,
    discount: "",
    cta: "Join the Discord",
    link: "https://discord.gg/AuAvjpTTnm",
    isAvailable: true,
    features: [
      "Get feedback on your CV from our community",
      "Access to generic CV templates",
      "CV writing tips and resources",
    ],
    description: "Get feedback on your CV from our community",
  },
  {
    id: "cv-writing",
    title: "Silver CV writing package",
    price: 20,
    originalPrice: 25,
    discount: "20% off - Limited time offer!",
    isFree: false,
    cta: "Get this package",
    isPopular: false,
    link: "/cv/cv-writing",
    isAvailable: true,
    features: [
      "Access to your own dedicated CV writer (someone who is working in the industry)",
      "2 day turnaround",
      "Access to CompClarity's Tech Internship Guide worth £11.99",
    ],
    description:
      "Our CV writing service is designed to help you stand out in the job market. Our team of experts will work with you to create a CV that highlights your skills and experience, and makes you stand out from the competition",
  },
  {
    id: "cv-full-package",
    title: "Gold CV writing package",
    price: 29,
    originalPrice: 58,
    discount: "50% off - Limited time offer!",
    isFree: false,
    cta: "Get this package",
    isPopular: true,
    isAvailable: true,
    link: "/cv/cv-full-package",
    features: [
      "Everything in the Silver Package",
      "Cover letter templates tailored to your CV",
      "LinkedIn profile optimisation",
      "Access to private community - referrals and network connections",
    ],
    description:
      "The best package for those who want to stand out in the job market. Our team of experts will work with you to tailor your CV and LinkedIn profile to your specific needs.",
  },
];

export const getTier = (id: string) => {
  return pricingTiers.find((tier) => tier.id === id);
};
