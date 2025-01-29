"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Marquee from "@/components/ui/marquee";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, FileText, Pen, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import CTABadge from "@/components/ui/cta-badge";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { pricingTiers } from "./product";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export const HeroSection = () => {
  return (
    <div className="mx-auto flex flex-col md:flex-row w-full items-center min-h-screen md:min-h-fit md:h-[calc(100vh-150px)] justify-center container gap-20 p-6 md:px-10">
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="relative self-start border rounded-full group">
          <CTABadge intro="Ready to land that dream job?" link="#pricing" target="_self" />
        </div>
        <div className="max-w-4xl p-2 space-y-5 text-left ">
          <h1 className="text-5xl font-bold tracking-tight transition animate-fade-in text-wrap lg:text-7xl">
            <span className="inline-block transition text-emerald-700 dark:text-emerald-500 hover:-translate-y-3">
              Increase
            </span>{" "}
            your{" "}
            <span className="inline-block transition text-emerald-700 dark:text-emerald-500 hover:-translate-y-3">
              odds
            </span>{" "}
            in getting hired.
          </h1>
          <h2 className="text-base text-gray-600 transition delay-100 animate-fade-in text-wrap font-open dark:text-gray-200 lg:text-lg">
            Tired of not even passing the CV screening stage? We can help. Our AI Suite creates standout CV and cover
            letters that showcases your experience and strengths that will get you noticed by employers.
          </h2>
          <Button className="transition bg-emerald-700 dark:bg-emerald-500" asChild>
            <Link href="/cv-generate">Get Started</Link>
          </Button>
        </div>
      </div>
      <img src="/assets/cv.svg" alt="CV" className="" />
    </div>
  );
};

export const MarqueeSection = () => {
  const companies = [
    {
      name: "Wise",
      icon: "/assets/wise.svg",
    },
    {
      name: "Meta",
      icon: "/assets/meta.svg",
    },
    {
      name: "Amazon",
      icon: "/assets/amazon.svg",
    },
    {
      name: "BoA",
      icon: "/assets/boa.svg",
    },

    {
      name: "Samsara",
      icon: "/assets/samsara.svg",
    },
    {
      name: "Citadel",
      icon: "/assets/citadel.svg",
    },
    {
      name: "Spotify",
      icon: "/assets/spotify.svg",
    },

    {
      name: "Palantir",
      icon: "/assets/palantir.svg",
    },
  ];
  return (
    <section className="flex flex-col items-center justify-center w-full text-white bg-emerald-700 dark:bg-emerald-900">
      <div className="w-full">
        <h2 className="p-4 font-bold text-center md:text-3xl">Our members received offers from</h2>
      </div>

      <Marquee className="w-full p-4">
        {companies.map((company, i) => (
          <div key={i} className="flex items-center gap-2 px-4 cursor-default">
            <Image alt={company.name} src={company.icon} width={50} height={50} className="size-32" />
            {/* <p>{company.name}</p> */}
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export const Pricing = () => {
  const router = useRouter();
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="container px-4 py-16 mx-auto space-y-4">
      <h2 className="text-xl font-bold text-center md:text-2xl lg:text-5xl">Get shortlisted into your dream job</h2>
      <p className="text-center text-gray-600 dark:text-gray-200">
        Get the perfect CV with just a small fraction of your potential salary.
      </p>

      <div className="flex items-center justify-center gap-2">
        <span className={cn("text-sm", !isYearly && "font-bold")}>Monthly</span>
        <Switch checked={isYearly} onCheckedChange={setIsYearly} />
        <span className={cn("text-sm", isYearly && "font-bold")}>Yearly (Save 17%)</span>
      </div>

      <div className="grid grid-cols-2 gap-8 pt-10">
        {pricingTiers.map((tier) => (
          <Card key={tier.id} className="flex flex-col">
            <CardHeader className="p-6">
              <CardTitle className="text-xl">{tier.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
              <div className="mb-4">
                {tier.isFree ? (
                  <span className="text-4xl font-bold">Free</span>
                ) : (
                  <>
                    <span className="text-4xl font-bold">£{isYearly ? tier.yearlyPrice : tier.monthlyPrice}</span>
                    <span className="ml-2 text-xl line-through text-muted-foreground">
                      £{isYearly ? tier.originalYearlyPrice : tier.originalMonthlyPrice}
                    </span>
                    {isYearly && <span className="ml-2 text-sm">/ year</span>}
                    {!isYearly && <span className="ml-2 text-sm">/ month</span>}
                  </>
                )}
                {tier.isPopular && <Badge className="ml-2 bg-emerald-500">MOST POPULAR</Badge>}
              </div>
              <p className="mb-4 text-red-700 dark:text-red-500">{tier.discount}</p>
              <Button
                className="mb-6 text-white bg-primary"
                disabled={!tier.isAvailable}
                onClick={() => {
                  if (tier.isAvailable) {
                    router.push(tier.link);
                  }
                }}
              >
                {tier.cta}
              </Button>
              <h3 className="mb-2 font-semibold">WHAT'S INCLUDED</h3>
              <ul className="flex-grow space-y-2">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="flex-shrink-0 w-5 h-5 mt-1 mr-2 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export const HowItWorks = () => {
  const howItWorksSteps = [
    {
      icon: Send,
      title: "1. Share your details",
      description:
        "Submit your existing CV or fill in your experience in the CV builder. Let us know your work experience, education, and skills.",
    },
    {
      icon: FileText,
      title: "2. Generate your CV and cover letter",
      description:
        "Create custom CVs and cover letters for different job applications, let our AI Suite do the heavy lifting for you.",
    },
    {
      icon: Pen,
      title: "3. Download & Apply",
      description:
        "Review, edit, and download your polished CV and cover letter. You just increased your chances of getting hired!",
    },
  ];
  return (
    <section id="how-it-works" className="container px-4 py-16 mx-auto space-y-4">
      <div className="container px-4 md:px-6">
        <h2 className="mb-12 text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl">
          How the AI Suite works
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {howItWorksSteps.map((step, index) => (
            <Card key={index}>
              <CardHeader className="p-6">
                <step.icon className="w-8 h-8 mb-2 text-primary stroke-emerald-700 dark:stroke-emerald-500" />
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>{step.description}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export const FAQ = () => {
  const faqItems = [
    {
      question: "How does the AI Suite work?",
      answer:
        "You'll be able to access your AI-powered CV and cover letter builder. Simply input your details and the builder will generate a professional CV and cover letter for you based on the role that you're applying to.",
    },
    {
      question: "Why should I care about job notifications?",
      answer:
        "The early bird catches the worm. Most employers recruit on a rolling basis, meaning they review candidates in the order they applied and close applications once headcount is reached.",
    },
    {
      question: "Can I cancel my subscription?",
      answer:
        "Yes, you can cancel your subscription at any time. Your subscription will remain active until the end of the billing cycle.",
    },
    {
      question: "What differentiates you from other career coaching services?",
      answer: "Cuz we love you and care about your success 😘",
    },
  ];
  return (
    <div className="w-full max-w-3xl p-6 mx-auto">
      <h2 className="mb-6 text-2xl font-bold">FAQ</h2>
      <Accordion type="multiple" defaultValue={faqItems.map((_, index) => `item-${index}`)} className="w-full">
        {faqItems.map((item, index) => (
          <AccordionItem key={`item-${index}`} value={`item-${index}`}>
            <AccordionTrigger className="text-left text-emerald-700 dark:text-emerald-500">
              {item.question}
            </AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

//I'll come back to this
export const PDF = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="md:w-[350px]">
      <div className="w-full aspect-[1.414/1] bg-white rounded-sm shadow-2xl p-6 transform transition-transform duration-500 ease-in-out hover:translate-y-0 translate-y-[-20px] rotate-y-[-5deg]">
        <div className="space-y-4">
          <AnimatePresence>
            {isLoaded ? (
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="text-2xl font-bold"
              >
                Jane Doe
              </motion.h1>
            ) : (
              <Skeleton className="w-3/4 h-8" />
            )}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, delay: 1 }}
              className="h-px bg-gray-300"
            />
            <h1 className="text-lg font-semibold text-left">Education</h1>
            {isLoaded ? (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2 }}>
                BSc Computer Science, University of Tech
              </motion.p>
            ) : (
              <Skeleton className="w-full h-8" />
            )}
            <h1 className="text-lg font-semibold text-left">Experience</h1>
            {isLoaded ? (
              <motion.ul className="pl-5 list-disc">
                <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 3 }}>
                  Software Engineer Intern, TechCorp
                </motion.li>
                <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 4 }}>
                  Research Assistant, AI Lab
                </motion.li>
              </motion.ul>
            ) : (
              <>
                <Skeleton className="w-full h-8" />
                <Skeleton className="w-3/4 h-8" />
              </>
            )}
            <h1 className="text-lg font-semibold text-left">Projects</h1>
            {isLoaded ? (
              <motion.ul className="pl-5 list-disc">
                <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 5 }}>
                  Web Development Portfolio
                </motion.li>
                <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 6 }}>
                  Machine Learning Research
                </motion.li>
              </motion.ul>
            ) : (
              <>
                <Skeleton className="w-full h-8" />
                <Skeleton className="w-3/4 h-8" />
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
