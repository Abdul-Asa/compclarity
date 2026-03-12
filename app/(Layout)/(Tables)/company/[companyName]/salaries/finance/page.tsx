import { Metadata } from "next";
import { fetchAllFinanceOffersByCompany, fetchCompanyByName } from "@/lib/actions/data";
import OfferTableControls from "@/components/tables/OfferTableControls";
import OfferTable from "@/components/tables/OfferTable";
import { CompanyHeader } from "@/components/tables/CompanyHeader";
import RoleDropdownMenu from "@/components/tables/RoleDropDown";

interface PageProps {
  params: { companyName: string };
  searchParams?: {
    search?: string;
    role?: string[] | string;
    sortBy?: string;
    sortDir?: string;
    page?: string;
    verified?: number;
    minYOE?: number;
    maxYOE?: number;
    size?: number;
  };
}

async function getCompanyOffers(companyName: string, searchParams?: PageProps["searchParams"]) {
  const currentPage = Number(searchParams?.page) || 1;
  const searchTerm = searchParams?.search || "";
  const sortBy = searchParams?.sortBy || null;
  const sortDir = searchParams?.sortDir || null;
  const verified = Number(searchParams?.verified) || 0;
  const minYOE = searchParams?.minYOE !== undefined ? Number(searchParams.minYOE) : null;
  const maxYOE = searchParams?.maxYOE !== undefined ? Number(searchParams.maxYOE) : null;
  const size = searchParams?.size !== undefined ? Number(searchParams.size) : null;

  let roles = new Set<string>();
  if (searchParams?.role !== undefined) {
    if (typeof searchParams.role === "string") {
      roles.add(searchParams.role);
    } else {
      roles = new Set<string>(searchParams.role);
    }
  }
  const offersResponse = await fetchAllFinanceOffersByCompany(
    currentPage.toString(),
    searchTerm,
    verified,
    roles,
    sortBy,
    sortDir,
    companyName,
    minYOE,
    maxYOE,
    size
  );
  return offersResponse;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const companyName = decodeURI(params.companyName).replace(/-/g, " ");
  const companyDetails = await getCompany(companyName);

  return {
    title: `${companyDetails.name} Salaries in the UK and EU`,
    description: `Compare finance salaries for ${companyDetails.name} in the UK and EU!`,
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

const Page = async ({ params, searchParams }: PageProps) => {
  const companyName = decodeURI(params.companyName).replace(/-/g, " ");
  const companyDetails = await getCompany(companyName);
  const offersResponse = await getCompanyOffers(companyDetails.name, searchParams);
  const path = `/company/${params.companyName}/salaries`;

  return (
    <>
      <div className="flex flex-col items-center justify-center p-4">
        <div className="bg-white dark:bg-black dark:border-border dark:border flex flex-col w-full md:w-2/3 p-4 md:p-8 rounded-lg items-center mb-2">
          <CompanyHeader companyDetails={companyDetails} />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row">
          &nbsp;
          <RoleDropdownMenu companyPath={path} forCompany={true} companyParams={params.companyName} />
          &nbsp;Salaries in Europe
        </div>
        <OfferTableControls isCompanyPage={true} />
        {offersResponse.totalResults === 0 ? (
          <b className="text-center mt-4">No finance salaries found for {companyDetails.name}</b>
        ) : (
          <>
            <OfferTable offersResponse={offersResponse} />
          </>
        )}
      </div>
    </>
  );
};

export default Page;
