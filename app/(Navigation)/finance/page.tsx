import type { Metadata } from "next";
import OfferTable from "@/components/OfferTable";
import OfferTableControls from "@/components/OfferTableControls";
import { fetchAllFinanceOffers } from "@/lib/data";
import RoleDropdownMenu from "@/components/RoleDropDown";

export const metadata: Metadata = {
  title: "CompClarity - Finance Salaries in the UK and EU",
  description:
    "Your guide to fair pay from day one. Compare finance salaries across Europe and make informed career choices with comprehensive, community-driven data!",
};

export default async function FinanceOffers({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    role?: string[] | string;
    sortBy?: string;
    sortDir?: string;
    page?: string;
    verified?: number;
  };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const searchTerm = searchParams?.search || "";
  const sortBy = searchParams?.sortBy || null;
  const sortDir = searchParams?.sortDir || null;
  const verified = Number(searchParams?.verified) || 0;
  let roles = new Set<string>();
  if (searchParams?.role !== undefined) {
    if (typeof searchParams.role === "string") {
      roles.add(searchParams.role);
    } else {
      roles = new Set<string>(searchParams.role);
    }
  }
  const offersResponse = await fetchAllFinanceOffers(
    (currentPage - 1).toString(),
    searchTerm,
    verified,
    roles,
    sortBy,
    sortDir,
  );

  return (
    <div className="flex flex-col items-center justify-center overflow-x-auto">
      <div className="flex flex-row">
        &nbsp;
        <RoleDropdownMenu forCompany={false} />
        &nbsp;Salaries in Europe
      </div>
      <OfferTableControls isCompanyPage={false} />
      {offersResponse.totalResults === 0 ? (
        <b className="text-center mt-24 mb-24">
          No finance salaries found
        </b>
        ) : (
          <>
            <OfferTable offersResponse={offersResponse} />
          </>
        )}
    </div>
  );
}
