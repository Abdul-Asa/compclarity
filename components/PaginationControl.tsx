"use client"

import Link from "next/link"
import { range } from "@/lib/utils"
import { usePathname, useSearchParams } from "next/navigation"

export default function PaginationControl({ results }: { results: number }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentPage = Number(searchParams.get("page")) || 1
  const totalPages = Math.ceil(results / 10)
  const lastPage = Math.min(Math.max(currentPage + 2, 5), totalPages)
  const firstPage = Math.max(1, lastPage - 4)

  const createPageURL = (pageNumber: number | string): string => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <nav
      className="flex items-center flex-col flex-wrap md:flex-row justify-center sm:justify-between pt-4 sm:w-full"
      aria-label="Table navigation"
    >
      <div className="text-sm font-normal text-gray-500 mb-4 md:mb-0 block md:inline">
        Showing{" "}
        <span className="font-semibold text-gray-900">
          {(currentPage - 1) * 10 + 1}-{Math.min(currentPage * 10, results)}
        </span>
        &nbsp;of&nbsp;
        <span className="font-semibold text-gray-900">{results}</span>
      </div>
      <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        {currentPage > 1 ? (
          <li key={"Prev"}>
            <Link
              href={createPageURL(currentPage - 1)}
              replace
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
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
                  className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                >
                  {pageNum}
                </Link>
              ) : (
                <Link
                  href={createPageURL(pageNum)}
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >
                  {pageNum}
                </Link>
              )}
            </li>
          )
        })}
        {currentPage < totalPages ? (
          <li key={"Next"}>
            <Link
              href={createPageURL(currentPage + 1)}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
            >
              Next
            </Link>
          </li>
        ) : null}
      </ul>
    </nav>
  )
}
