import type { Metadata } from "next";
import Link from "next/link";
import { JobRowContent } from "@/components/JobRowContent";
import { fetchJob } from "@/lib/data";
import { createClient } from "@/lib/supabase/server";

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
      <div className="bg-white dark:bg-black dark:border-gray-700 dark:border p-16 sm:pr-40 sm:pl-40">
        <JobRowContent addedDateStr={addedDateStr} job={job} signedIn={signedIn} />
        <div className="mt-4 flex justify-center">
          <Link href="/jobs">
            <button className="bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 dark:text-black text-sm py-2 px-2 rounded mt-4">
              View All Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default page;
