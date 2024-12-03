"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import svgToDataUri from "mini-svg-data-uri";
import { useEffect, useRef, useState } from "react";
import Marquee from "@/components/ui/marquee";
import { Separator } from "@/components/ui/separator";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CTABadge from "@/components/ui/cta-badge";
import { TransitionView } from "@/components/ui/transition";

const HeroSection = () => {
  return (
    <section className="mx-auto flex h-[calc(100svh-150px)] w-full flex-col items-center justify-center gap-5 p-6 md:px-0">
      <CTABadge intro="Hey!" main="Welcome to the first step in securing your dream job 😎" link="" />
      <h1 className="max-w-4xl animate-fade-in text-wrap p-2 text-center text-5xl font-bold tracking-tight transition lg:text-8xl">
        Your <span className="inline-block text-brand transition hover:-translate-y-3">guide</span> to fair pay from{" "}
        <span className="inline-block text-brand transition hover:-translate-y-3">day one</span>. .
      </h1>
      <h2 className="max-w-3xl animate-fade-in text-wrap text-center font-open text-base text-gray-600 dark:text-gray-200 transition delay-100 lg:text-lg">
        Uncover salary insights, find your next job, and track your applications all in one place.
      </h2>
      <div className="my-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Button asChild>
          <Link href="/tech">
            View&nbsp;<strong>Tech</strong>&nbsp;Salaries
          </Link>
        </Button>
        <Button asChild>
          <Link href="/finance">
            View&nbsp;<strong>Finance</strong>&nbsp;Salaries
          </Link>
        </Button>
      </div>
    </section>
  );
};
const MarqueeSection = () => {
  return (
    <section className="flex w-full flex-col items-center justify-center bg-brand text-white">
      <div className="w-full">
        <h2 className="p-4 text-center font-bold md:text-3xl">500+ community verified salaries from top companies</h2>
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
const FeatureSection = () => {
  return (
    <section className="mx-auto flex w-full flex-col items-center justify-center gap-5 p-6">
      <div className="mt-16 sm:text-center">
        <h2 className="p-4 text-xl font-bold md:text-2xl lg:text-5xl">The best way to accelerate your career</h2>
        <p className="max-w-4xl px-4 font-open lg:text-lg">
          CompClarity is a platform that allows you to compare salaries across Europe. Find companies to target and work
          your way towards your dream role. No more spending years at a dead-end job.
        </p>
      </div>
      <Separator className="block h-0.5 md:hidden" />
      <div className="flex w-full flex-col gap-28 md:p-20">
        <TransitionView className="flex w-full flex-col items-center justify-center gap-2 md:flex-row md:gap-10">
          <div className="flex w-full max-w-md flex-col justify-center p-4">
            <h2 className="py-4 text-lg font-bold lg:text-2xl">Discover Transparent Salary Data</h2>
            <p className="font-open">
              Gain insights into salaries across industries and roles. Make informed career decisions with accurate,
              up-to-date salary information collected from thousands of professionals.
            </p>
            <Button className="my-6 w-fit " asChild>
              <Link href="/tech">Explore Salaries</Link>
            </Button>
          </div>
          <div className="flex rounded-sm border-2 border-emerald-700 p-1">
            <Image
              src="/assets/salary.png"
              alt="Compare Salaries with CompClarity"
              width={900}
              height={500}
              unoptimized
            />
          </div>
        </TransitionView>
        <TransitionView className="flex w-full flex-col-reverse items-center justify-center gap-2 md:flex-row md:gap-10">
          <div className="flex rounded-sm border-2 border-emerald-700 p-1">
            <Image src="/assets/jobs.png" alt="CompClarity Job Board" width={800} height={300} unoptimized />
          </div>
          <div className="flex w-full max-w-md flex-col justify-center p-4">
            <h2 className="py-4 text-lg font-bold lg:text-2xl">Find Your Next Opportunity</h2>
            <p className="font-open">
              Explore job listings tailored to your skills and interests. Our job board connects you with top employers
              looking for talent like yours.
            </p>

            <Button className="my-6 w-fit" asChild>
              <Link href="/jobs">Discover Jobs</Link>
            </Button>
          </div>
        </TransitionView>
        <TransitionView className="flex w-full flex-col items-center justify-center gap-2 md:flex-row md:gap-10">
          <div className="flex w-full max-w-md flex-col justify-center p-4">
            <h2 className="py-4 text-lg font-bold lg:text-2xl">Stay Organized with Our Application Tracker</h2>
            <p className="font-open">
              Keep track of all your job applications in one place. Never miss a follow-up with our intuitive tracker
              that helps you manage your job search efficiently.
            </p>
            <Button className="my-6 w-fit" asChild>
              <Link href="/tracker">Get Started</Link>
            </Button>
          </div>
          <div className="flex rounded-sm border-2 border-emerald-700 p-1">
            <Image
              src="/assets/tracker.png"
              alt="CompClarity Application Tracker"
              width={900}
              height={300}
              unoptimized
            />
          </div>
        </TransitionView>
      </div>
    </section>
  );
};
const TestimonialSection = () => {
  const [carouselApi, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    if (!carouselApi) return;

    setCurrent(carouselApi.selectedScrollSnap() + 1);
    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  const autoPlay = useRef(
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
    })
  );
  //Plugin does auto scroll
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (!carouselApi) return;
  //     carouselApi.scrollNext();
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [current, carouselApi]);

  return (
    <section className="mx-auto flex w-full flex-col items-center justify-center gap-5">
      <h2 className="p-4 text-center text-lg font-bold md:text-2xl lg:text-5xl">What others are saying</h2>
      <div
        className="flex w-full flex-col items-center justify-center border-y-2 border-emerald-700 bg-gradient-to-tr py-4 md:py-10"
        style={{
          backgroundImage: `url("${svgToDataUri(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="green"><path d="M0 .5H31.5V32"/></svg>`
          )}")`,
        }}
      >
        <Carousel
          setApi={setApi}
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[autoPlay.current]}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="flex justify-center p-10 sm:basis-1/2 md:basis-1/3 xl:basis-1/4">
                <div
                  className={cn(
                    "h-65 relative transform border-2 border-black transition duration-300 ease-in-out sm:min-w-60",
                    current === index + 1
                      ? "-translate-y-4 scale-110 bg-brand text-white"
                      : "bg-white text-black dark:bg-gray-800 dark:text-white"
                  )}
                  style={{
                    clipPath:
                      " polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0px 100%, 0px 0px)",
                  }}
                  onClick={() => {
                    if (!carouselApi) return;
                    carouselApi.scrollTo(index);
                    // setCurrent(index + 1);
                  }}
                >
                  <span
                    className="absolute block origin-top-right rotate-45 bg-black object-cover"
                    style={{
                      right: "-2px",
                      top: "48px",
                      width: "70.7107px",
                      height: "2px",
                    }}
                  />

                  <div className="p-7">
                    <Avatar
                      className={cn(
                        "mb-2 size-10 rounded-none border-2",
                        current === index + 1 ? "border-white" : "border-black"
                      )}
                    >
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <h3 className="text-sm font-bold">- {testimonial.name}</h3>
                    <h3 className="text-sm italic">{testimonial.role}</h3>
                    <p className="mt-10 text-sm">&rdquo;{testimonial.text}&rdquo;</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-10 text-lg">
            <CarouselPrevious
              className="rounded-none hover:bg-brand bg-brand/80 border-brand text-white"
              handleClick={() => autoPlay.current.reset()}
            />
            <CarouselNext
              className="rounded-none hover:bg-brand bg-brand/80 border-brand text-white"
              handleClick={() => autoPlay.current.reset()}
            />
          </div>
        </Carousel>
      </div>
    </section>
  );
};
const SubscribeSection = () => {
  return (
    <TransitionView className="mx-auto flex w-full flex-col items-center justify-center gap-5 p-6 py-20 md:px-0">
      <div className="group relative rounded-full bg-brand">
        <CTABadge intro="Join us!" main="Subscribe to our newsletter 📬" link="https://compclarity.substack.com/" />
      </div>
      <h1 className="max-w-4xl animate-fade-in text-wrap p-2 text-center text-3xl font-bold tracking-tight transition lg:text-6xl">
        Stay up to date with the latest salary trends
      </h1>
      <h2 className="max-w-3xl animate-fade-in text-wrap text-center font-open text-base text-gray-600 dark:text-gray-200 transition delay-100 lg:text-lg">
        Join our Discord community to stay up to date with the latest salary trends and to connect with other
        professionals in the industry.
      </h2>
      <Button size={"lg"} asChild>
        <Link href="https://discord.gg/AuAvjpTTnm" className="my-6">
          Chat on Discord
        </Link>
      </Button>
    </TransitionView>
  );
};

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
    name: "Morgan Stanley",
    icon: "/assets/morganstanley.svg",
  },
  {
    name: "Revolut",
    icon: "/assets/revolut.svg",
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
    name: "Visa",
    icon: "/assets/visa.svg",
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
    name: "JP Morgan",
    icon: "/assets/jpmorgan.svg",
  },
  {
    name: "Jane Street",
    icon: "/assets/janestreet.svg",
  },
  {
    name: "Palantir",
    icon: "/assets/palantir.svg",
  },
  {
    name: "Shopify",
    icon: "/assets/shopify.svg",
  },
];

const testimonials = [
  {
    avatar: "/assets/dave.jpeg",
    name: "Daveraj",
    role: "Software Engineer Intern @ Sky",
    text: "The application tracker allowed me to manage multiple job applications without losing track. I always knew where I stood with each potential employer and could easily follow up.",
  },
  {
    avatar: "/assets/sasha.jpeg",
    name: "Sasha",
    role: "Analyst @ Morgan Stanley",
    text: "The website is very intuitive. I love the job board because it offers so many opportunities that other platforms don't catch.",
  },
  {
    avatar: "/assets/ivan.jpeg",
    name: "Ivan",
    role: "Software Developer II @ Amazon",
    text: "CompClarity's salary sharing feature was a game-changer for me. It gave me insights into what I should be earning and helped me land a role with a great salary.",
  },
  {
    avatar: "/assets/una.jpeg",
    name: "Una",
    role: "Software Engineer Intern @ Goldman Sachs",
    text: "Actually helpful. Other sites can be unreliable and hard to navigate. CompClarity saves you time and energy in the current job market.",
  },
  {
    avatar: "/assets/brit.jpeg",
    name: "Britannio",
    role: "Software Engineer Intern @ Wise",
    text: "CompClarity has transformed my job search experience! The salary sharing tool helped me understand the market rates, and I felt more confident with my offer.",
  },
  {
    avatar: "/assets/alice.jpeg",
    name: "Alice",
    role: "Analyst @ HSBC",
    text: "Extremely useful for understanding compensation packages across companies. The platform is easy to use and reliable.",
  },
  {
    avatar: "/assets/elliot.jpeg",
    name: "Elliot",
    role: "Software Engineer @ JPMorgan",
    text: "CompClarity's job board is a goldmine. It has the latest listings from top companies, all curated and easy to navigate.",
  },
];

export { HeroSection, MarqueeSection, FeatureSection, TestimonialSection, SubscribeSection };
