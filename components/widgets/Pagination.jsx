import Link from "next/link";
import React from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

const Pagination = ({ pathPrefix, currentPage, totalPages = 1 }) => {
  let pages = [];
  for (let index = 1; index < totalPages + 1; index++) {
    pages = [...pages, index];
  }

  if (totalPages <= 1) return <div></div>;

  return (
    <div className="my-4 w-full flex items-center justify-between">
      <Link
        href={`${pathPrefix}?page=${
          currentPage !== 1 ? parseInt(currentPage) - 1 : 1
        }`}
      >
        <button
          disabled={currentPage === 1}
          className="px-6 w-auto py-3 bg-charcoal disabled:bg-gray-400 disabled:hover:text-black flex items-center rounded-sm hover:text-gold text-white"
        >
          <ChevronLeft className="h-5 w-auto mr-3" />
          <span className="capitalize">Back</span>
        </button>
      </Link>
      <div className="flex items-center">
        {totalPages !== 1 && (
          <select
            className="
                    block
                    w-full
                    mr-3
                    rounded-sm
                    bg-gray-100
                    border
                    focus:border-gray-500 focus:bg-white focus:ring-0
                  
                  "
            name="pages"
            as="select"
          >
            {pages.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        )}
        {currentPage === totalPages && (
          <Link
            href={`${pathPrefix}?page=${
              currentPage !== totalPages
                ? parseInt(currentPage) + 1
                : currentPage
            }`}
          >
            <button
              disabled={currentPage === totalPages}
              className="px-6 w-auto py-3 bg-charcoal disabled:bg-gray-400 disabled:hover:text-black flex items-center rounded-sm hover:text-gold text-white"
            >
              <span className="capitalize">Next</span>
              <ChevronRight className="h-5 w-auto ml-3" />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Pagination;
