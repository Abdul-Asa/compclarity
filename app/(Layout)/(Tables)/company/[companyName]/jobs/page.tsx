import { CompanyHeader } from "@/components/tables/CompanyHeader";
import { fetchCompanyByName, fetchAllJobsByCompany } from "@/lib/actions/data";
import { Metadata } from "next";
import JobTableControls from "@/components/tables/JobTableControls";
import JobTable from "@/components/tables/JobTable";
import { createClient } from "@/lib/supabase/server";

interface PageProps {
  params: { companyName: string };
  searchParams?: {
    search?: string;
    role?: string[] | string;
    sortBy?: string;
    sortDir?: string;
    page?: string;
    industries?: string[] | string;
    size?: number;
  };
}

async function getCompany(companyName: string) {
  let company;
  try {
    company = await fetchCompanyByName(companyName);
  } catch (error) {
    company = await fetchCompanyByName(companyName.replace(/\s+/g, "-"));
  }
  return company;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const companyName = decodeURI(params.companyName).replace(/-/g, " ");
  const companyDetails = await getCompany(companyName);

  return {
    title: `${companyDetails.name} Jobs in the UK`,
    description: `Explore the latest job openings from ${companyDetails.name} and apply!`,
  };
}

async function getCompanyJobs(companyName: string, searchParams?: PageProps["searchParams"]) {
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
  const jobsResponse = await fetchAllJobsByCompany(
    (currentPage - 1).toString(),
    searchTerm,
    roles,
    sortBy,
    sortDir,
    companyName,
    industryTypes,
    size
  );
  return jobsResponse;
}

const Page = async ({ params, searchParams }: PageProps) => {
  const companyName = decodeURI(params.companyName).replace(/-/g, " ");
  const companyDetails = await getCompany(companyName);
  const jobsResponse = await getCompanyJobs(companyDetails.name, searchParams);

  let signedIn = false;

  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();

  if (!error && data?.user) {
    signedIn = true;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center p-4">
        <div className="bg-white dark:bg-black dark:border-gray-700 dark:border flex flex-col w-full md:w-2/3 p-4 md:p-8 rounded-lg items-center mb-2">
          <CompanyHeader companyDetails={companyDetails} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <JobTableControls isCompanyPage={true} />
        {jobsResponse.totalResults === 0 ? (
          <b className="text-center mt-4">No jobs found for {companyDetails.name}</b>
        ) : (
          <>
            <JobTable jobsResponse={jobsResponse} signedIn={signedIn} />
          </>
        )}
      </div>
    </>
  );
};

export default Page;
