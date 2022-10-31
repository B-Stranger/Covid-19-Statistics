import { useEffect, useState } from "react";
import { AggregatedCovidStat } from "../services";

const calculateRange = (data: AggregatedCovidStat[], rowsPerPage: number) => {
  const range = [];
  const num = Math.ceil(data.length / rowsPerPage);
  let i = 1;
  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  return range;
};
const sliceData = (
  data: AggregatedCovidStat[],
  page: number,
  rowsPerPage: number
) => {
  return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
};

export const usePagination = (
  data: AggregatedCovidStat[],
  page: number,
  rowsPerPage: number
) => {
  const [tableRange, setTableRange] = useState([]);
  const [slice, setSlice] = useState([]);

  useEffect(() => {
    const range = calculateRange(data, rowsPerPage);
    setTableRange([...range]);

    const slice = sliceData(data, page, rowsPerPage);
    setSlice([...slice]);
  }, [data, setTableRange, page, setSlice]);

  return { slice, range: tableRange };
};
