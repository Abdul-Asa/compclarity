"use client";
import CTABadge from "@/components/ui/cta-badge";
import CountUp from "@/components/ui/count-up";
import {
  BarChart,
  CircleArrowUp,
  LayoutDashboardIcon,
  MailIcon,
  PilcrowLeftIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function EmployerPage() {
  return (
    <main className="flex min-h-screen w-full flex-col ">
      <div className="mx-auto flex h-[calc(100vh-150px)] w-full flex-col items-center justify-center gap-5 p-6 md:px-0">
        <div className="group relative rounded-full border">
          <CTABadge intro="Ready to find your next great hire?" />
        </div>
        <Heading />
        <Stats />
      </div>
      <Features />
      <ContactForm />
      <FAQ />
    </main>
  );
}

const Heading = () => {
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

const Stats = () => {
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

const Features = () => {
  return (
    <div className="flex flex-col size-full items-center justify-center gap-5 p-6">
      <h1 className="text-wrap text-2xl md:text-5xl font-bold tracking-tight">
        Our <span className="text-emerald-700">Offerings</span>
      </h1>
      <h2 className="text-wrap mx-10 text-center font-open text-base text-gray-600 transition delay-100 lg:text-lg">
        The most ambitious students and early-career professionals from Russell
        Group universities visit CompClarity to explore opportunities at leading
        companies. Being featured here means top emerging talent will have you
        on their radar.
      </h2>
      <div className="grid grid-cols-1 border shadow-sm rounded-xl  md:grid-cols-2 w-full p-6 md:[&>*:nth-child(even)]:border-l md:[&>*]:border-b   md:[&>*:nth-last-child(-n+2)]:border-b-0">
        <div className="flex flex-col p-6 h-[280px]">
          <div className="flex items-center gap-4 ">
            <CircleArrowUp className="size-10 text-emerald-700" />
            <h1 className="flex-1 text-wrap text-4xl font-bold">
              Personalized Offers
            </h1>
          </div>
          <p className="mt-4 text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi vel
            expedita quam! Id voluptatum et, ad qui quaerat illo nisi odit
            tempore veritatis laborum assumenda aliquam nemo aliquid quos
            repudiandae.
          </p>
        </div>
        <div className="flex flex-col p-6 h-[280px]">
          <div className="flex items-center gap-4 ">
            <LayoutDashboardIcon className="size-10 text-emerald-700" />
            <h1 className="flex-1 text-wrap text-4xl font-bold">Analytics</h1>
          </div>
          <p className="mt-4  text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia,
            distinctio. vel tempora perferendis natus dolores rerum architecto?
          </p>
        </div>
        <div className="flex flex-col p-6 h-[280px]">
          <div className="flex items-center gap-4 ">
            <PilcrowLeftIcon className="size-10 text-emerald-700" />
            <h1 className="flex-1 text-wrap text-4xl font-bold">
              Salary Benchmarking
            </h1>
          </div>
          <p className="mt-4 text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eum
            corrupti sapiente mollitia quod sequi ipsum repellat asperiores
            obcaecati, temporibus nesciunt aliquam, repellendus, totam ullam
            fuga tempore! Dolorum, distinctio? Dignissimos, nulla.
          </p>
        </div>
        <div className="flex flex-col p-6 h-[280px]">
          <div className="flex items-center gap-4 ">
            <BarChart className="size-10 text-emerald-700" />
            <h1 className="flex-1 text-wrap text-4xl font-bold">
              Wide Demographic
            </h1>
          </div>
          <p className="mt-4 text-gray-600">
            Our advanced analytics and reporting tools provide you with deep
            insights into your hiring processes. You can track performance
            metrics, analyze trends, and make data-driven decisions to enhance
            your recruitment strategy. With our platform, you can ensure that
            you are always one step ahead in the competitive hiring landscape.
          </p>
        </div>
      </div>
    </div>
  );
};

const ContactForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log("Submitted email:", email);
    // Reset the email input
    setEmail("");
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-inherit">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Contact Us</CardTitle>
        <CardDescription>
          We'd love to hear from you. Enter your email and we'll get back to you
          soon.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <MailIcon
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  size={20}
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Send
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

const FAQ = () => {
  const faqItems = [
    {
      question: "What is React?",
      answer:
        "React is a popular JavaScript library for building user interfaces. It allows developers to create reusable UI components and efficiently update and render them when data changes.",
    },
    {
      question: "How do I install React?",
      answer:
        "You can create a new React project using Create React App by running 'npx create-react-app my-app' in your terminal. Alternatively, you can add React to an existing project by installing it via npm or yarn.",
    },
    {
      question: "What are React hooks?",
      answer:
        "React hooks are functions that allow you to use state and other React features in functional components. Some commonly used hooks include useState, useEffect, and useContext.",
    },
    {
      question: "What is JSX?",
      answer:
        "JSX is a syntax extension for JavaScript that looks similar to XML or HTML. It allows you to write HTML-like code in your JavaScript files, making it easier to describe what the UI should look like.",
    },
  ];
  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
      <Accordion
        type="multiple"
        defaultValue={faqItems.map((_, index) => `item-${index}`)}
        className="w-full"
      >
        {faqItems.map((item, index) => (
          <AccordionItem key={`item-${index}`} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {item.question}
            </AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
