import OfferTable from "@/components/tables/OfferTable";
import OfferTableControls from "@/components/tables/OfferTableControls";
import RoleDropdownMenu from "@/components/tables/RoleDropDown";
import { fetchAllOffers } from "@/lib/actions/data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CompClarity - Tech Salaries in the UK and EU",
  description:
    "Your guide to fair pay from day one. Compare tech salaries across Europe and make informed career choices with comprehensive, community-driven data!",
};

export default async function Offers({
  searchParams,
}: {
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
}) {
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

  const offersResponse = await fetchAllOffers(
    (currentPage - 1).toString(),
    searchTerm,
    verified,
    roles,
    sortBy,
    sortDir,
    minYOE,
    maxYOE,
    size
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
        <b className="text-center mt-24 mb-24">No tech salaries found</b>
      ) : (
        <>
          <OfferTable offersResponse={offersResponse} />
        </>
      )}
    </div>
  );
}
