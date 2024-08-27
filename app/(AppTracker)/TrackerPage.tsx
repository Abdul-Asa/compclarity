import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function TrackerPage() {
  return (
    <main className="mx-auto flex min-h-screen w-full flex-col items-center p-6">
      <HeroSection />
      <FeatureSection />
    </main>
  );
}

const HeroSection = () => {
  return (
    <section className="mx-auto p-6 md:px-0">
      <div className="flex w-full flex-col items-center justify-center pt-10">
        <h1 className="max-w-4xl animate-fade-in text-wrap p-2 text-center text-2xl font-bold tracking-tight transition lg:text-5xl">
          Track your{" "}
          <span className="inline-block text-emerald-700 transition hover:-translate-y-1">
            job applications
          </span>{" "}
          like a{" "}
          <span className="inline-block text-emerald-700 transition hover:-translate-y-1">
            pro
          </span>
          .
        </h1>
        <Button size={"lg"} className="my-10 bg-emerald-700" asChild>
          <Link href="/login">Get Started</Link>
        </Button>
      </div>
    </section>
  );
};

const FeatureSection = () => {
  return (
    //the p-20 adds padding to all the sides, then the pt-0 removes padding from the top overwriting the p-20
    //the more specific padding is applied. i.e pt-1 then py-1 then p-1
    //You gotta take note of the md:. the styles without prefix take effect on all screen sizes unless overwritten
    // i.e pt-0 md:p-20. The p-20 will take effect on screens larger than md so the pt-0 will only take effect on screens smaller than md.
    <div className="flex w-full flex-col gap-28 pb-20 pt-0 md:p-20">
      <div className="flex w-full flex-col items-center justify-center gap-2 md:flex-row md:gap-10">
        <div className="flex w-full max-w-md flex-col justify-center p-4">
          <h2 className="py-4 text-lg font-bold lg:text-2xl">
            Create an Application to Track
          </h2>
          <p className="font-open">
            No more spreadsheets. Keep all your job applications organized in
            one place. Our application tracker helps you stay on top of your job
            search.
          </p>
        </div>
        <div className="flex rounded-sm border-2 border-emerald-700 p-1">
          <Image
            src="/assets/create.png"
            alt="Feature 1"
            width={500}
            height={500}
            unoptimized
          />
        </div>
      </div>
      <div className="flex w-full flex-col-reverse items-center justify-center gap-2 md:flex-row md:gap-10">
        <div className="flex rounded-sm border-2 border-emerald-700 p-1">
          <Image
            src="/assets/tracker.png"
            alt="Feature 1"
            width={900}
            height={300}
            unoptimized
          />
        </div>
        <div className="flex w-full max-w-md flex-col justify-center p-4">
          <h2 className="py-4 text-lg font-bold lg:text-2xl">
            Update Your Application Status with Ease
          </h2>
          <p className="font-open">
            Drag and drop your applications to update their status. Keep track
            of your progress and never miss a deadline.
          </p>
        </div>
      </div>
      {/* <div className="flex w-full flex-col items-center justify-center gap-2 md:flex-row md:gap-10">
        <div className="flex w-full max-w-md flex-col justify-center p-4">
          <h2 className="py-4 text-lg font-bold lg:text-2xl">
            Add Notes and Reminders
          </h2>
          <p className="font-open">
            Referals, interview dates, and follow-ups. Keep track of all the
            important details with our notes and reminders feature.
          </p>
        </div>
        <div className="flex rounded-sm border-2 border-emerald-700 p-1">
          <Image
            src="/assets/tracker.png"
            alt="Feature 1"
            width={800}
            height={300}
            unoptimized
          />
        </div>
      </div> */}
    </div>
  );
};
