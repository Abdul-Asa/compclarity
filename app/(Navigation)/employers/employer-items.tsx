"use client";
import CountUp from "@/components/ui/count-up";
import {
  BarChart,
  CircleArrowUp,
  LayoutDashboardIcon,
  PilcrowLeftIcon,
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const Heading = () => {
  return (
    <section className="p-2 max-w-4xl text-center space-y-5 ">
      <h1 className="animate-fade-in text-wrap text-5xl font-bold tracking-tight transition lg:text-7xl">
        Find{" "}
        <span className="inline-block text-emerald-700 transition hover:-translate-y-3">
          Top
        </span>{" "}
        Talents,{" "}
        <span className="inline-block text-emerald-700 transition hover:-translate-y-3">
          Effortlessly{" "}
        </span>
        .
      </h1>
      <h2 className="animate-fade-in text-wrap font-open text-base text-gray-600 transition delay-100 lg:text-lg">
        Streamline your hiring process and discover exceptional candidates with
        ease. We connect you with the right talent, so you can focus on what
        really matters – growing your business.
      </h2>
    </section>
  );
};

export const Stats = () => {
  const coolStats = [
    {
      num: 90,
      suffix: "%",
      title: "Conversion rate",
      disableAnimation: false,
    },
    {
      num: 130,
      suffix: "k",
      title: "Candidates to choose from",
    },
    {
      num: 45000,
      suffix: "+",
      title: "Monthly active users",
    },
  ];
  return (
    <section className="p-5 mt-8 flex justify-center items-center flex-col gap-3 md:gap-8">
      <h1 className="text-wrap text-2xl md:text-5xl font-bold tracking-tight">
        Our <span className="text-emerald-700">audience</span>
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
    </section>
  );
};

export const Features = () => {
  const featureItems = [
    {
      icon: <CircleArrowUp className="size-10 text-emerald-700" />,
      title: "Personalized Offers",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi vel expedita quam! Id voluptatum et, ad qui quaerat illo nisi odit tempore veritatis laborum assumenda aliquam nemo aliquid quos repudiandae.",
    },
    {
      icon: <LayoutDashboardIcon className="size-10 text-emerald-700" />,
      title: "Analytics",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia, distinctio. vel tempora perferendis natus dolores rerum architecto?",
    },
    {
      icon: <PilcrowLeftIcon className="size-10 text-emerald-700" />,
      title: "Salary Benchmarking",
      description:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum corrupti sapiente mollitia quod sequi ipsum repellat asperiores obcaecati, temporibus nesciunt aliquam, repellendus, totam ullam fuga tempore! Dolorum, distinctio? Dignissimos, nulla.",
    },
    {
      icon: <BarChart className="size-10 text-emerald-700" />,
      title: "Wide Demographic",
      description:
        "Our advanced analytics and reporting tools provide you with deep insights into your hiring processes. You can track performance metrics, analyze trends, and make data-driven decisions to enhance your recruitment strategy. With our platform, you can ensure that you are always one step ahead in the competitive hiring landscape.",
    },
  ];

  return (
    <div className="flex flex-col size-full items-center justify-center gap-5 p-6">
      <h1 className="text-wrap text-2xl md:text-5xl font-bold tracking-tight">
        Our <span className="text-emerald-700">Offering</span>
      </h1>
      <h2 className="text-wrap mx-10 text-center font-open text-base text-gray-600 transition delay-100 lg:text-lg">
        The most ambitious students and early-career professionals from Russell
        Group universities visit CompClarity to explore opportunities at leading
        companies. Being featured here means top emerging talent will have you
        on their radar.
      </h2>
      <div className="grid grid-cols-1 border mt-10 shadow-sm rounded-xl md:grid-cols-2 w-full p-6 md:[&>*:nth-child(even)]:border-l md:[&>*]:border-b md:[&>*:nth-last-child(-n+2)]:border-b-0">
        {featureItems.map((item, index) => (
          <div key={index} className="flex flex-col p-6 min-h-60 ">
            <div className="flex flex-col md:flex-row gap-4 ">
              {item.icon}
              <h1 className="flex-1 text-wrap text-4xl font-bold">
                {item.title}
              </h1>
            </div>
            <p className="mt-4 text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

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
        with us .
      </h1>
      <h2 className="animate-fade-in text-wrap font-open text-base text-gray-600 transition delay-100 lg:text-lg">
        Get in Touch to Learn How You Can Reach Top Talent
      </h2>

      <Link
        href="mailto:contact@compclarity.com"
        className={cn(buttonVariants(), "bg-emerald-700 text-white w-80")}
      >
        Submit
      </Link>
    </section>
  );
};

export const FAQ = () => {
  const faqItems = [
    {
      question: "How many people use CompClarity?",
      answer:
        "1.5 million unique users use CompClarity every month. To put that number into perspective, there's approximately ~8 million tech professionals currently within the US. With one of the highest candidate volumes within tech, CompClarity can get your company brand and opportunities in front of a large segment of the industry.",
    },
    {
      question:
        "What experience level are the candidates on the CompClarity platform?",
      answer:
        "CompClarity has the attention of some of the most experienced professionals within the tech industry. 60%+ of CompClarity users are at the second level or above within their company. 27% of users are at the third level or above. 35% of users have greater than 7 years of experience.",
    },
    {
      question: "Which locations do you support?",
      answer:
        "70% of our users are based out of the United States. While the US is our largest presence, we have significant presences across Canada, Europe, and India. If you'd like to learn more about a particular location, book some time with us here.",
    },
    {
      question: "I have another question.",
      answer: (
        <a
          href="#contact"
          className="underline decoration-emerald-700"
          onClick={(e) => {
            e.preventDefault();
            const element = document.getElementById("contact");
            if (element) {
              const elementRect = element.getBoundingClientRect();
              const offset = window.innerHeight / 2 - elementRect.height / 2;
              window.scrollTo({
                top:
                  element.getBoundingClientRect().top + window.scrollY - offset,
                behavior: "smooth",
              });
            }
          }}
        >
          Book time with us here.
        </a>
      ),
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
