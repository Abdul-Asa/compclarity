"use client";

import { Offer } from "@/lib/types";
import { RsuBreakdown } from "./RsuBreakdown";
import LogoImage from "./LogoImage";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "./ui/use-toast";
import { Briefcase, Flag, Share } from "lucide-react";
import Link from "next/link";
import VerifiedSvg from "./VerifiedSvg";

import { FaTransgender } from "react-icons/fa";
import {
  FaUserTie,
  FaBriefcase,
  FaIndustry,
  FaGlobe,
  FaLaptop,
  FaGraduationCap,
  FaGift,
  FaCalendarDays,
} from "react-icons/fa6";

import { Tooltip } from "react-tooltip";

interface OfferRowContentProps {
  expanded?: boolean;
  offer: Offer;
  addedDateStr: string;
  idx?: number;
}

export const OfferRowContent = ({
  expanded = true,
  offer,
  addedDateStr,
  idx,
}: OfferRowContentProps) => {
  return expanded ? (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg px-4 font-open text-gray-500 sm:justify-between sm:px-0 lg:flex-row">
      <div className="flex flex-col items-center gap-4 self-center sm:flex-row">
        <div className="flex shrink-0 flex-row items-center justify-center gap-4 border-b p-3 sm:flex-col sm:gap-2 sm:border-b-0 sm:border-r">
          <LogoImage companyDomain={offer.company.domain} size={"large"} />
          <div className="flex flex-col items-center justify-center gap-2 text-center text-xs">
            <span>{offer.company.name}</span>
            <span>
              {offer.city}, {offer.countryCode}
            </span>
            <small className="text-center italic">Added {addedDateStr}</small>
          </div>
          <div className="mt-2 flex flex-col-reverse items-center sm:flex-row sm:space-x-2">
            <div className="flex flex-col text-xs">
              <Link
                className="rounded-md p-2 transition ease-in-out hover:bg-red-500 hover:text-white"
                href="https://discord.gg/AuAvjpTTnm"
                target="_blank"
              >
                <Flag />
              </Link>
              <small className="text-center">Report</small>
            </div>
            <div className="flex flex-col text-xs">
              <CopyToClipboard
                text={`https://compclarity.com/offer/${offer.rowId.toLowerCase()}`}
                onCopy={() => {
                  toast({
                    title: "Link copied to clipboard.",
                    variant: "constructive",
                  });
                }}
              >
                <button className="rounded-md p-2 text-center transition ease-in-out hover:bg-green-500 hover:text-white">
                  <Share />
                </button>
              </CopyToClipboard>
              <small className="text-center">Share</small>
            </div>
          </div>
        </div>
        <div className="flex max-w-sm flex-col gap-2 sm:items-start">
          <div className="flex flex-row items-center gap-2">
            <span className="text-left text-base font-bold">{offer.title}</span>
            {offer.verified ? (
              <>
                <a
                  className={`verified${idx} cursor-pointer`}
                  data-tooltip-html="This offer has been manually<br/> verified via an offer letter"
                >
                  <VerifiedSvg />
                </a>
                <Tooltip anchorSelect={`.verified${idx}`} />
              </>
            ) : null}
          </div>
          <div className="flex flex-row items-center gap-2">
            <FaCalendarDays className="h-3 w-3" />
            <span>{offer.offerYear}</span>
          </div>
          <div className="flex flex-row items-center gap-2">
            <FaUserTie className="h-3 w-3" />
            <span>{offer.level}</span>
          </div>
          <div className="flex flex-row items-center gap-2">
            <FaBriefcase className="h-3 w-3" />
            <span>
              {" "}
              {offer.yoe} {offer.yoe === 1 ? "year" : "years"} of experience
            </span>
          </div>
          {offer.sector && (
            <div className="flex flex-row items-center gap-2">
              <FaIndustry className="h-3 w-3" />
              <span>{offer.sector}</span>
            </div>
          )}
          <div className="flex flex-row items-center gap-2 text-left">
            <FaGift className="h-3 w-3 shrink-0" />
            <span> {offer.extra ? offer.extra : "N/A"}</span>
          </div>
          <hr />

          <div className="mb-1 text-left font-bold">Other</div>
          {offer.education && (
            <div className="flex flex-row items-center gap-2">
              <FaGraduationCap className="h-3 w-3" />
              <span>{offer.education}</span>
            </div>
          )}
          {offer.arrangement && (
            <div className="flex flex-row items-center gap-2">
              <FaLaptop className="h-3 w-3" />
              <span>{offer.arrangement}</span>
            </div>
          )}
          {offer.gender && (
            <div className="flex flex-row items-center gap-2">
              <FaTransgender className="h-3 w-3" />
              <span>{offer.gender}</span>
            </div>
          )}
          {offer.ethnicity && (
            <div className="flex flex-row items-center gap-2">
              <FaGlobe className="h-3 w-3" />
              <span>{offer.ethnicity}</span>
            </div>
          )}
          <div className="border-b sm:border-none"></div>
        </div>
      </div>

      <table className="flex flex-col sm:items-center sm:justify-center sm:px-10">
        <tbody>
          <tr className="text-left">
            <td>
              <span className="font-bold">Base Salary</span>
              {""}
              {offer.level === "Intern" && (
                <span className="text-xs italic"> (prorated)</span>
              )}
              :
            </td>
            <td>{offer.compDetails?.base}</td>
          </tr>
          <tr className="text-left">
            <td className="pr-2 font-bold">Sign-On Bonus:</td>
            <td>{offer.compDetails?.signOnBonus}</td>
          </tr>
          <tr className="text-left">
            <td className="font-bold">Annual Bonus:</td>
            <td>{offer.compDetails?.annualBonus}</td>
          </tr>
          <tr className="text-left">
            <td>
              <span className="font-bold">Average RSUs</span>
              {""}
              {/* Don't delete below in case it's needed later */}
              {/* {offer.vestingPeriod != 0 && (
                  <span className="italic text-xs">
                    ({offer.vestingPeriod}-year vest)
                  </span>
                )} */}
              :
            </td>
            <td>{offer.compDetails?.averageRsu}</td>
          </tr>
          <tr>
            <td colSpan={4}>
              <RsuBreakdown
                percentage={offer.percentage}
                rsu={offer.rsu}
                currency={offer.equityCurrency}
              />
            </td>
          </tr>
          <tr className="border-t text-left">
            <td className="font-bold">Total Compensation:</td>
            <td>{offer.compDetails?.totalComp}</td>
          </tr>
        </tbody>
      </table>
    </div>
  ) : null;
};
