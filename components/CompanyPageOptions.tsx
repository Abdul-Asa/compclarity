"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Company } from "@/lib/types";

interface CompanyPageOptionsProps {
    companyDetails: Company;
}

export function CompanyPageOptions({ companyDetails }: CompanyPageOptionsProps) {
    const pathname = usePathname();
    // const isOverview = pathname.endsWith(companyDetails.name.replace(/\s+/g, '-').toLowerCase());
    const isSalaries = pathname.endsWith('salaries') || pathname.endsWith('salaries/finance');
    const isJobs = pathname.endsWith('jobs')

    return (
        <>
            <div className="flex-col items-center">
                <Link href={`/company/${companyDetails.name.replace(/\s+/g, '-').toLowerCase()}/salaries`}>
                    <button
                        className={`bg-gray-100 hover:bg-gray-200 text-lg md:text-base px-6 py-2 rounded-l-lg w-24 ${
                            isSalaries ? "font-bold" : ""
                        }`}
                    >
                        Salaries
                    </button>
                </Link>
                <Link href={`/company/${companyDetails.name.replace(/\s+/g, '-').toLowerCase()}/jobs`}>
                    <button
                        className={`bg-gray-100 hover:bg-gray-200 text-lg md:text-base px-6 py-2 rounded-r-lg w-24 ${
                            isJobs ? "font-bold" : ""
                        }`}
                    >
                        Jobs
                    </button>
                </Link>
            </div>
        </>
    );
}
