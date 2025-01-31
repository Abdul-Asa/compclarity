"use client";

import { OfferApiResponse } from "@/lib/validation/types";
import OfferRow from "./OfferRow";
import SortButton from "../Buttons/SortButton";
import PaginationControl from "./PaginationControl";

export default function OfferTable({ offersResponse }: { offersResponse: OfferApiResponse }) {
  return (
    <div className="flex flex-col justify-center items-center w-full lg:w-2/3 2xl:w-5/6 px-4">
      <table className="text-sm text-gray-500 dark:text-gray-100 text-center w-full ">
        <thead className="text-gray-700 bg-gray-50 border-b-2 dark:bg-black dark:text-gray-100 dark:border-border">
          <tr>
            <th scope="col"></th>
            <th scope="col" className="px-1 py-4 w-1/3">
              <div className="flex flex-col items-center justify-center">
                <div className="uppercase sm:font-bold">Company</div>
                <div className="text-xs font-thin">Location | Added</div>
              </div>
            </th>
            <th scope="col" className="px-1 py-4 w-1/3">
              <div className="flex flex-col items-center justify-start">
                <div className="uppercase font-bold">Title</div>
                <div className="text-xs font-thin">Year | YOE</div>
              </div>
            </th>
            <th scope="col" className="px-1 py-4 w-1/3">
              <div className="flex items-center justify-center sm:gap-2">
                <div className="flex flex-col items-center justify-center">
                  <div className="uppercase font-bold">Total Compensation</div>
                  <div className="text-xs font-thin">Base | Bonus | RSUs</div>
                </div>
                <SortButton />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {offersResponse.offers.map((offer, offerIdx) => (
            <OfferRow offer={offer} idx={offerIdx} key={offerIdx} />
          ))}
        </tbody>
      </table>
      <PaginationControl results={offersResponse.totalResults} />
    </div>
  );
}
