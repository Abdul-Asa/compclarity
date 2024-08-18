"use client";

import { Offer } from "@/lib/types";
import VerifiedSvg from "./VerifiedSvg";
import { Tooltip } from "react-tooltip";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { OfferRowContent } from "./OfferRowContent";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

export default function OfferRow({
  offer,
  idx,
}: {
  offer: Offer;
  idx: number;
}) {
  const [expanded, toggleExpanded] = useState(false);
  const pathname = usePathname();
  const isForFinance = pathname.endsWith("finance");

  const addedDateStr = offer.addedDate.toLocaleDateString("en-UK");
  const getMinimizedOfferStr = () => {
    const totalBonus = offer.annualBonus + offer.signOnBonus;
    let offerStr = `${offer.baseSalary / 1000}K |`;
    offerStr += totalBonus > 0 ? ` ${totalBonus / 1000}K |` : " - |";
    offerStr += offer.averageRsu > 0 ? ` ${offer.averageRsu / 1000}K` : " -";

    return offerStr;
  };

  useEffect(() => {
    toggleExpanded(false);
  }, [offer]);

  return (
    <>
      <tr
        onClick={() => toggleExpanded(!expanded)}
        key={idx}
        className={
          "cursor-pointer border-b " +
          (expanded ? "bg-gray-50" : "bg-white hover:bg-gray-50")
        }
      >
        <td className="px-2">
          {expanded ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </td>
        <td className="px-1 py-4">
          <div>
            <div className="flex flex-col items-center justify-center">
              {isForFinance ? (
                <a
                  href={`/company/${offer.company.name
                    .replace(/\s+/g, "-")
                    .toLowerCase()}/salaries/finance`}
                  onClick={(e) => e.stopPropagation()}
                  className="hover:underline"
                >
                  <span className="line-clamp-3 text-gray-900 md:line-clamp-1">
                    {offer.company.name}
                  </span>
                </a>
              ) : (
                <a
                  href={`/company/${offer.company.name
                    .replace(/\s+/g, "-")
                    .toLowerCase()}/salaries`}
                  onClick={(e) => e.stopPropagation()}
                  className="hover:underline"
                >
                  <span className="line-clamp-3 text-gray-900 md:line-clamp-1">
                    {offer.company.name}
                  </span>
                </a>
              )}
              <span className="text-xs">
                {offer.city}, {offer.countryCode} | {addedDateStr}
              </span>
            </div>
          </div>
        </td>
        <td className="px-1 py-4">
          <div className="flex flex-col items-center justify-center">
            <div className="line-clamp-3 text-gray-900 md:line-clamp-1">
              {offer.title}
            </div>
            <div className="text-xs">
              {offer.offerYear} | {offer.yoe}
            </div>
          </div>
        </td>
        <td className="px-1 py-4">
          <a
            className={
              "flex flex-col items-center justify-center" +
              (offer.level === "INTERN" ? ` pro-rata${idx} cursor-pointer` : "")
            }
          >
            <div className="flex flex-row items-center justify-center gap-1">
              <span className="text-gray-900">
                {offer.compDetails?.totalComp}
              </span>
              {offer.verified ? <VerifiedSvg /> : null}
            </div>
            <span className="text-xs"> {getMinimizedOfferStr()}</span>
          </a>
          {offer.level == "Intern" ? (
            <Tooltip anchorSelect={`.pro-rata${idx}`}>
              <div className="flex flex-col items-center justify-center">
                <span>This compensation is</span>
                <span>prorated</span>
              </div>
            </Tooltip>
          ) : null}
        </td>
      </tr>

      {expanded ? (
        <tr className="bg-white">
          <td colSpan={5} className="p-3">
            <OfferRowContent
              expanded={expanded}
              offer={offer}
              addedDateStr={addedDateStr}
              idx={idx}
            />
          </td>
        </tr>
      ) : null}
    </>
  );
}
