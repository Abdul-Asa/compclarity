import Link from "next/link"

interface CompanyOverviewProps {
    descriptionOverview: string,
    locationOverview: string,
    companyLinkedin: string
    companyWebsite: string
}

export default function CompanyOverview( {descriptionOverview, locationOverview, companyLinkedin, companyWebsite}: CompanyOverviewProps ) {
    return (
        <>
            <b className="text-lg">Overview</b>
            <span className="text-sm md:text-base text-center">{descriptionOverview}</span>
            
            <hr className="w-full my-2 md:my-4 border-2" />
            
            <b className="text-lg">Headquarters</b>
            <span className="text-sm md:text-base">{locationOverview}</span>
            
            <hr className="w-full my-2 md:my-4 border-2" />
            
            <b className="text-lg">Links</b>
            
            <div className="flex-row overflow-auto">
                <Link href={"test.com"} target="_blank">
                    <span className="hover:font-bold text-sm md:text-base">{companyWebsite}</span>
                </Link>
            </div>

            <div className="flex-row overflow-auto">
                <Link href={"www.linkedin.com/company/microsoft"} target="_blank">
                    <span className="hover:font-bold text-sm md:text-base">{companyLinkedin}</span>
                </Link>
            </div>
        </>
    )
}