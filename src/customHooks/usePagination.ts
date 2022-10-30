import { useMemo } from "react";

export const usePagination = (
  totalCount: number,
  pageSize: number,
  siblingCount: number = 2,
  currentPage: number
) => {
  const paginationRange = useMemo(() => {
    //  implementation logic will go here
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
