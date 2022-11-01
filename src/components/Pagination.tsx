import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

interface PaginationProps {
  statsPerPage: number;
  totalStats: number;
  paginate: Function;
  currentPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  statsPerPage,
  totalStats,
  paginate,
  currentPage,
}) => {
  const pageNumbers: number[] = [];

  for (let i = 1; i <= Math.ceil(totalStats / statsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-center border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
        <a
          className="btn-pagination cursor-pointer"
          onClick={() => paginate(currentPage - 1)}
        >
          <ChevronLeftIcon className="h-5" />
        </a>
        {pageNumbers.map((page) => (
          <a
            key={page}
            href="!#"
            onClick={() => paginate(page)}
            className={
              currentPage === page ? " btn-pagination active" : "btn-pagination"
            }
          >
            {page}
          </a>
        ))}
        <a
          className="btn-pagination cursor-pointer"
          onClick={() => paginate(currentPage + 1)}
        >
          <ChevronRightIcon className="h-5" />
        </a>
      </nav>
    </div>
  );
};

export default Pagination;
