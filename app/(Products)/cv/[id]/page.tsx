import type { Metadata } from "next";
import Link from "next/link";

interface pageProps {
  params: { id: string };
}

// Edit the metadata for the page
export async function generateMetadata({ params }: pageProps): Promise<Metadata> {
  if (params.id == "cv-writing") {
    return {
      title: `CompClarity - CV Writing`,
      description: `Get your CV professionally written by CompClarity and land your dream job!`,
    };
  } else if (params.id == "interview-coaching") {
    return {
      title: `CompClarity - Interview Coaching`,
      description: `Ace your interviews with CompClarity's expert coaching services!`,
    };
  } else {
    return {
      title: `CompClarity - CV & Interview Services`,
      description: `Get your CV professionally written and ace your interviews with CompClarity's expert coaching services!`,
    };
  }
}

const page = async ({ params }: pageProps) => {
  return (
    <div className="bg-white dark:bg-black dark:border-gray-700 dark:border p-16 sm:pr-40 sm:pl-40">
      {params.id == "cv-writing" && <h1>CV Writing</h1>}
      {params.id == "interview-coaching" && <h1>Interview Coaching</h1>}
    </div>
  );
};

export default page;
