"use client";
import CountUp from "@/components/ui/count-up";
import { BarChart, CircleArrowUp, Users, CircleDollarSign } from "lucide-react";
import { useRef } from "react";
import { buttonVariants } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import { useMediaQuery } from "@/components/hooks/useMediaQuery";

export const Heading = () => {
  return (
    <section className="p-2 max-w-4xl text-center space-y-5 ">
      <h1 className="animate-fade-in text-wrap text-5xl font-bold tracking-tight transition lg:text-7xl">
        Find{" "}
        <span className="inline-block text-emerald-700 transition hover:-translate-y-3">
          Top
        </span>{" "}
        Talent,{" "}
        <span className="inline-block text-emerald-700 transition hover:-translate-y-3">
          Effortlessly{" "}
        </span>
        .
      </h1>
      <h2 className="animate-fade-in text-wrap font-open text-base text-gray-600 transition delay-100 lg:text-lg">
        Streamline your hiring process and discover exceptional early career
        candidates with ease. We showcase your job listings to the right talent,
        so you can focus on the more exciting stuff.
      </h2>
    </section>
  );
};

export const Stats = () => {
  const coolStats = [
    {
      num: 20000,
      suffix: "+",
      title: "Monthly Unique Visitors",
    },
    {
      num: 71,
      suffix: "%",
      title: "Click-Through Rate (on job posts)",
      disableAnimation: false,
    },
  ];
  const isMobile = useMediaQuery("mobile");
  return (
    <motion.section
      drag={!isMobile}
      dragMomentum={false}
      dragConstraints={{ top: 4, left: 4, right: 4, bottom: 4 }}
      className="p-5 my-8 flex justify-center items-center flex-col gap-3 bg-white md:gap-8 border-2  border-black shadow-[8px_8px_0px_#047857]"
    >
      <h1 className="text-wrap text-2xl md:text-5xl font-bold tracking-tight">
        Our audience
      </h1>
      <div className="flex flex-wrap justify-center gap-8 md:gap-16">
        {coolStats.map((stat, index) => (
          <div key={index} className="text-center">
            <CountUp
              className="text-3xl md:text-4xl font-bold text-emerald-700"
              num={stat.num}
              suffix={stat.suffix}
              disableAnimation={stat.disableAnimation || false}
            />
            <dt className="font-open mt-2 font-bold">{stat.title}</dt>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export const Features = () => {
  const featureItems = [
    {
      icon: <CircleArrowUp className="size-10 text-emerald-700" />,
      title: "Increased Visibility",
      description:
        "Ensure your job postings stand out by pinning them at the top of our job board, where they'll be seen by thousands of motivated job seekers. Pinned postings receive 3x more applications!",
    },
    {
      icon: <Users className="size-10 text-emerald-700" />,
      title: "Find the Right Talent",
      description:
        "The majority of CompClarity users are students and early-career professionals, making CompClarity the ideal platform to connect with fresh talent eager to bring new ideas and energy to your organization.",
    },
    {
      icon: <BarChart className="size-10 text-emerald-700" />,
      title: "Analytics",
      description:
        "Access detailed analytics on your sponsored listings, including clicks and application rates. With our platform, you can ensure that you are always one step ahead in the competitive hiring landscape.",
    },
    {
      icon: <CircleDollarSign className="size-10 text-emerald-700" />,
      title: "Cost-Effective Recruitment",
      description:
        "Maximize your recruitment budget by investing in sponsored listings that offer higher ROI through increased engagement and application rates.",
    },
  ];

  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
      className="flex flex-col size-full items-center justify-center gap-5 p-6"
    >
      <h1 className="text-wrap text-2xl md:text-5xl font-bold tracking-tight">
        What we offer
      </h1>
      <h2 className="text-wrap mx-10 text-center font-open text-base text-gray-600 transition delay-100 lg:text-lg">
        Ambitious students and early-career professionals use CompClarity to
        explore opportunities at leading companies. Advertising your job
        listings here ensures that top emerging talent will have you on their
        radar.
      </h2>
      <div className="grid grid-cols-1 border bg-white mt-10 shadow-sm rounded-xl md:grid-cols-2 w-full md:p-6 md:[&>*:nth-child(even)]:border-l md:[&>*]:border-b md:[&>*:nth-last-child(-n+2)]:border-b-0">
        {featureItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col h-full p-6 min-h-[309px] text-center md:text-left"
          >
            <div className="flex flex-col h-full justify-between items-center md:flex-row gap-4 ">
              {item.icon}
              <h1 className="flex-1 text-wrap text-4xl font-bold ">
                {item.title}
              </h1>
            </div>
            <p className="mt-4 h-full text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

//Edit this
export const ContactForm = () => {
  return (
    <section
      id="contact"
      className="w-full max-w-screen-md text-center space-y-5 my-10 p-4  mx-auto bg-inherit"
    >
      <h1 className="animate-fade-in text-wrap text-5xl font-bold tracking-tight transition lg:text-7xl">
        <span className="inline-block text-emerald-700 transition hover:-translate-y-3">
          Advertise
        </span>{" "}
        with us.
      </h1>
      <h2 className="animate-fade-in text-wrap font-open text-base text-gray-600 transition delay-100 lg:text-lg">
        Don't let your perfect candidate slip away, get in touch today.
      </h2>
      <Link
        href="mailto:contact@compclarity.com"
        className={cn(buttonVariants(), "bg-emerald-700 text-white w-80")}
      >
        Contact
      </Link>
    </section>
  );
};

export const FAQ = () => {
  const faqItems = [
    {
      question: "What types of roles are best suited for sponsored listings?",
      answer:
        "Sponsored listings are particularly effective for reaching early-career talent, as our user base is primarily composed of students and recent graduates in STEM or finance related fields.",
    },
    {
      question: "How long will my job listing remain pinned?",
      answer:
        "Your job listing will remain pinned at the top of our job board for the duration of the sponsorship period you select. You can choose from various timeframes to suit your hiring needs. Contact us to learn more.",
    },
    {
      question: "Can I sponsor multiple job listings at once?",
      answer:
        "Yes, you can sponsor multiple job listings simultaneously. Each listing will be prominently featured at the top of the job board, increasing visibility across your open positions.",
    },
    {
      question: "Which locations do you support?",
      answer: "Currently, CompClarity only supports the UK for job postings.",
    },
  ];
  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">FAQ</h2>
      <Accordion
        type="multiple"
        defaultValue={faqItems.map((_, index) => `item-${index}`)}
        className="w-full"
      >
        {faqItems.map((item, index) => (
          <AccordionItem key={`item-${index}`} value={`item-${index}`}>
            <AccordionTrigger className="text-left text-emerald-700">
              {item.question}
            </AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
