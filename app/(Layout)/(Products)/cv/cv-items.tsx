"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion, AnimatePresence } from "framer-motion";
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

export const HeroSection = () => {
  return (
    <div className="mx-auto flex flex-col md:flex-row w-full items-center min-h-screen md:min-h-fit md:h-[calc(100vh-150px)] justify-center container gap-20 p-6 md:px-10">
      <div className="flex flex-col items-center justify-center gap-5">
        <div className="group relative rounded-full border self-start">
          <CTABadge intro="Ready to land that dream job?" link="#pricing" target="_self" />
        </div>
        <div className="p-2 max-w-4xl text-left space-y-5 ">
          <h1 className="animate-fade-in text-wrap text-5xl font-bold tracking-tight transition lg:text-7xl">
            <span className="inline-block text-emerald-700 dark:text-emerald-500 transition hover:-translate-y-3">
              Craft
            </span>{" "}
            the perfect{" "}
            <span className="inline-block text-emerald-700 dark:text-emerald-500 transition hover:-translate-y-3">
              CV
            </span>{" "}
            in one go.
          </h1>
          <h2 className="animate-fade-in text-wrap font-open text-base text-gray-600 dark:text-gray-200 transition delay-100 lg:text-lg">
            Tired of not even passing the CV screening stage? We can help. Our team of experts will work with you to
            create a standout CV that showcases your experience and strengths that will get you noticed by employers.
          </h2>
          <Button className="bg-emerald-700 dark:bg-emerald-500 transition" asChild>
            <Link href="#pricing">Get Started</Link>
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
    <section className="flex w-full flex-col items-center justify-center bg-emerald-700 text-white dark:bg-emerald-900">
      <div className="w-full">
        <h2 className="p-4 text-center font-bold md:text-3xl">Our members work at</h2>
      </div>

      <Marquee className="w-full p-4">
        {companies.map((company, i) => (
          <div key={i} className="flex cursor-default items-center gap-2 px-4">
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

  return (
    <section id="pricing" className="container space-y-4 mx-auto px-4 py-16">
      <h2 className=" text-xl font-bold md:text-2xl text-center lg:text-5xl">Get shortlisted into your dream job</h2>
      <p className=" text-center text-gray-600 dark:text-gray-200">
        Get the perfect CV with just a small fraction of your potential salary.
      </p>
      <div className="grid pt-10  md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingTiers.map((tier) => (
          <Card key={tier.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">{tier.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col">
              <div className="mb-4">
                {tier.isFree ? (
                  <span className="text-4xl font-bold">Free</span>
                ) : (
                  <>
                    <span className="text-4xl font-bold">£{tier.price}</span>
                    <span className="text-xl text-muted-foreground line-through ml-2">£{tier.originalPrice}</span>
                  </>
                )}
                {tier.isPopular && <Badge className="ml-2 bg-emerald-500">MOST POPULAR</Badge>}
              </div>
              <p className="text-red-700 mb-4 dark:text-red-500">{tier.discount}</p>
              <Button
                className="mb-6 bg-brand text-white"
                disabled={!tier.isAvailable}
                onClick={() => {
                  if (tier.isAvailable) {
                    router.push(tier.link);
                  }
                }}
              >
                {tier.cta}
              </Button>
              <h3 className="font-semibold mb-2">WHAT'S INCLUDED</h3>
              <ul className="space-y-2 flex-grow">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" />
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
      title: "1. Send us your details",
      description: "Submit your existing CV. Let us know your work experience, education, and skills.",
    },
    {
      icon: FileText,
      title: "2. CV Writing",
      description: "Our team of experts will work with you to create your perfect CV.",
    },
    {
      icon: Pen,
      title: "3. Download & Apply",
      description: "Review, edit if needed, and download your polished CV. You're ready to apply for jobs!",
    },
  ];
  return (
    <section id="how-it-works" className="container space-y-4 mx-auto px-4 py-16">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">How It Works</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {howItWorksSteps.map((step, index) => (
            <Card key={index}>
              <CardHeader>
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
      question: "Do I need an existing CV to begin?",
      answer: "Yes, we will need it to transform your existing CV to a masterpiece.",
    },
    {
      question: "Do you offer any revisions after the CV is delivered?",
      answer:
        "Yes, we offer up to two rounds of revisions to ensure you're completely satisfied with the final product.",
    },
    {
      question: "Will you format my CV according to the latest industry standards?",
      answer:
        "Yes, we stay up to date with the latest CV formats and industry expectations to ensure your CV looks professional and modern.",
    },
    {
      question: "What differentiates you from other resume review/career coaching services?",
      answer: "Cuz we love you and care about your success 😘",
    },
  ];
  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">FAQ</h2>
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
              <Skeleton className="h-8 w-3/4" />
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
              <Skeleton className="h-8 w-full" />
            )}
            <h1 className="text-lg font-semibold text-left">Experience</h1>
            {isLoaded ? (
              <motion.ul className="list-disc pl-5">
                <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 3 }}>
                  Software Engineer Intern, TechCorp
                </motion.li>
                <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 4 }}>
                  Research Assistant, AI Lab
                </motion.li>
              </motion.ul>
            ) : (
              <>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-3/4" />
              </>
            )}
            <h1 className="text-lg font-semibold text-left">Projects</h1>
            {isLoaded ? (
              <motion.ul className="list-disc pl-5">
                <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 5 }}>
                  Web Development Portfolio
                </motion.li>
                <motion.li initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 6 }}>
                  Machine Learning Research
                </motion.li>
              </motion.ul>
            ) : (
              <>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-3/4" />
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
