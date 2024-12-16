import type { Metadata } from "next";
import Link from "next/link";
import { JobRowContent } from "@/components/tables/JobRowContent";
import { fetchJob } from "@/lib/actions/data";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

interface pageProps {
  params: { id: string };
}

export async function generateMetadata({ params }: pageProps): Promise<Metadata> {
  const job = await fetchJob(params.id);

  return {
    title: `Job Details - ${job.company.name} ${job.title} (${job.city}, ${job.countryCode})`,
    description: `Check out a new ${job.title} job opening from ${job.company.name} located in ${job.city}, ${job.countryCode}! Brought to you by CompClarity, your guide to fair pay from day one.`,
  };
}

const page = async ({ params }: pageProps) => {
  const job = await fetchJob(params.id);

  const addedDateStr = job.addedDate.toLocaleDateString("en-UK");

  let signedIn = false;

  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (!error && data?.user) {
    signedIn = true;
  }

  return (
    <>
      <div className="bg-white dark:bg-black dark:border-border dark:border p-16 sm:pr-40 sm:pl-40">
        <JobRowContent addedDateStr={addedDateStr} job={job} signedIn={signedIn} />
        <div className="mt-4 flex justify-center">
          <Button variant={"outline"} asChild>
            <Link href="/jobs">View All Jobs</Link>
          </Button>
        </div>
      </div>
    </>
  );
};

export default page;
