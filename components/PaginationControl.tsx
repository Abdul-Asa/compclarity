"use client";

import Link from "next/link";
import { range } from "@/lib/utils";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import PageResultsButton from "./Buttons/PageResultsButton";
import { useEffect } from "react";

export default function PaginationControl({ results }: { results: number }) {
  const { replace } = useRouter();
  const validPageSizes = [10, 25, 50, 75, 100];
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = validPageSizes.includes(Number(searchParams.get("size"))) ? Number(searchParams.get("size")) : 10;
  const totalPages = Math.ceil(results / pageSize);
  const lastPage = Math.min(Math.max(currentPage + 2, 5), totalPages);
  const firstPage = Math.max(1, lastPage - 4);

  useEffect(() => {
    const urlPageSize = Number(searchParams.get("size"));
    if (!validPageSizes.includes(urlPageSize)) {
      const params = new URLSearchParams(searchParams);
      params.set("size", "10"); 
      params.set("page", "0");
      replace(`${pathname}?${params.toString()}`);
    }
  }, [searchParams, pathname, replace]);

  const createPageURL = (pageNumber: number | string): string => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    if (!validPageSizes.includes(Number(searchParams.get("size")))) {
      params.set("size", "10"); 
    }
    return `${pathname}?${params.toString()}`;
  };

  return (
    <nav
      className="flex items-center flex-col flex-wrap md:flex-row justify-center sm:justify-between pt-4 sm:w-full"
      aria-label="Table navigation"
    >

    <div className="flex items-center space-x-4 mb-4 md:mb-0">
        <div className="text-sm font-normal text-gray-500 dark:text-gray-300">
          Showing{" "}
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {(currentPage - 1) * pageSize + 1}-{Math.min(currentPage * pageSize, results)}
          </span>
          &nbsp;of&nbsp;
          <span className="font-semibold text-gray-900 dark:text-gray-100">{results}</span>
        </div>
        <PageResultsButton />
      </div>
      
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        {currentPage > 1 ? (
          <li key={"Prev"}>
            <Link
              href={createPageURL(currentPage - 1)}
              replace
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Previous
            </Link>
          </li>
        ) : null}
        {range(firstPage, lastPage).map((pageNum) => {
          return (
            <li key={pageNum}>
              {currentPage == pageNum ? (
                <Link
                  href={createPageURL(pageNum)}
                  replace
                  aria-current="page"
                  className="flex items-center justify-center px-3 h-8 text-emerald-600 border border-gray-300 bg-emerald-50 dark:bg-emerald-900 dark:text-emerald-300 dark:border-emerald-700 hover:bg-emerald-100 hover:text-emerald-700"
                >
                  {pageNum}
                </Link>
              ) : (
                <Link
                  href={createPageURL(pageNum)}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 hover:bg-gray-100 hover:text-gray-700"
                >
                  {pageNum}
                </Link>
              )}
            </li>
          );
        })}
        {currentPage < totalPages ? (
          <li key={"Next"}>
            <Link
              href={createPageURL(currentPage + 1)}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Next
            </Link>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
