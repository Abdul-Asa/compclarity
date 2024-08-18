"use client";

import { Company } from "@/lib/types";
import LogoImage from "./LogoImage";
import { CompanyPageOptions } from "./CompanyPageOptions";

interface CompanyHeaderProps {
  companyDetails: Company;
}

export function CompanyHeader({ companyDetails }: CompanyHeaderProps) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <LogoImage companyDomain={companyDetails.domain} size="small" />
          <b className="text-2xl ml-4">{companyDetails.name}</b>
        </div>
      </div>

      <div className="mt-4 mb-1">
        <CompanyPageOptions companyDetails={companyDetails} />
      </div>
    </>
  );
}