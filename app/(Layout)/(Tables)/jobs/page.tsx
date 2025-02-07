import type { Metadata } from "next";
import JobTableControls from "@/components/tables/JobTableControls";
import { fetchAllJobs } from "@/lib/actions/data";
import JobTable from "@/components/tables/JobTable";
import { getUser } from "@/lib/actions/server-actions";

export const metadata: Metadata = {
  title: "CompClarity - Jobs",
  description: "Explore the latest job openings from the tech and finance industry across the UK and EU!",
};

export default async function JobBoard({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    role?: string[] | string;
    sortBy?: string;
    sortDir?: string;
    page?: string;
    industries?: string[] | string;
    size?: number;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const searchTerm = searchParams?.search || "";
  const sortBy = searchParams?.sortBy || null;
  const sortDir = searchParams?.sortDir || null;
  const size = searchParams?.size !== undefined ? Number(searchParams.size) : null;

  let roles = new Set<string>();
  if (searchParams?.role !== undefined) {
    if (typeof searchParams.role === "string") {
      roles.add(searchParams.role);
    } else {
      roles = new Set<string>(searchParams.role);
    }
  }

  let industryTypes = new Set<string>();
  if (searchParams?.industries !== undefined) {
    if (typeof searchParams.industries === "string") {
      industryTypes.add(searchParams.industries);
    } else {
      industryTypes = new Set<string>(searchParams.industries);
    }
  }

  const jobsResponse = await fetchAllJobs(
    (currentPage - 1).toString(),
    searchTerm,
    roles,
    sortBy,
    sortDir,
    industryTypes,
    size
  );

  let signedIn = false;
  const user = await getUser();
  if (user) {
    signedIn = true;
  }

  return (
    <div className="flex flex-col justify-center items-center overflow-x-auto">
      <span className="text-center block sm:inline-block px-4 py-2">
        Explore the latest Tech & Finance job openings across the UK
      </span>
      <JobTableControls isCompanyPage={false} />
      {jobsResponse.totalResults === 0 ? (
        <b className="text-center mb-14 mt-14">No jobs found</b>
      ) : (
        <>
          <JobTable jobsResponse={jobsResponse} signedIn={signedIn} isSubscribed={user?.is_subscribed || false} />
        </>
      )}
    </div>
  );
}
