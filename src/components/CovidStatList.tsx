import React, { useEffect, useState } from "react";
import { CovidStats } from "../clients";

import { getAggregatedStats } from "../services";
import { AggregatedByCountryCovidStat } from "../services/models";
import Pagination from "./Pagination";

interface CovidStatsListProps {
  data: CovidStats[];
  startDate: Date;
  endDate: Date;
  selectedCountry: string;
  statsToShow: number;
}

const CovidStatList: React.FC<CovidStatsListProps> = ({
  data,
  startDate,
  endDate,
  selectedCountry,
  statsToShow,
}) => {
  const [allListData, setAllListData] = useState<
    AggregatedByCountryCovidStat[]
  >([]);
  const [currentListData, setCurrentListData] = useState<
    AggregatedByCountryCovidStat[]
  >([]);
  const [statsPerPage, setStatsPerPage] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const paginateStats = () => {
    setStatsPerPage(statsToShow);
    const indexOfLastStat = currentPage * statsPerPage;
    const indexOfFirstStat = indexOfLastStat - statsPerPage;
    setCurrentListData(allListData.slice(indexOfFirstStat, indexOfLastStat));
  };

  useEffect(() => {
    const aggregatedStats = getAggregatedStats(data);
    setAllListData(
      aggregatedStats.byCountry(startDate, endDate, selectedCountry)
    );
    setCurrentPage(1);
    paginateStats();
  }, [startDate, endDate, selectedCountry, data]);

  useEffect(() => {
    paginateStats();
  });

  const handlePaginate = (pageNumber: number) => {
    if (
      pageNumber > 0 &&
      pageNumber <= Math.ceil(allListData.length / statsPerPage)
    ) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className=" pl-4 pr-3 sm:pl-6   ">
                Страна
              </th>
              <th scope="col" className="hidden sm:table-cell">
                Количество случаев
              </th>
              <th scope="col" className="hidden sm:table-cell">
                Количество смертей
              </th>
              <th scope="col" className="hidden sm:table-cell">
                Количество случаев всего
              </th>
              <th scope="col" className="hidden sm:table-cell">
                Количество смертей всего
              </th>
              <th scope="col" className="hidden sm:table-cell">
                Количество случаев на 1000 жителей
              </th>
              <th scope="col" className="hidden sm:table-cell">
                Количество смертей на 1000 жителей
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white m-2">
            {currentListData.map((stat, index) => (
              <tr key={index} className=" m-2">
                <td className="pl-4 pr-3 font-medium text-gray-900 sm:pl-6">
                  <>{stat.country}</>
                  <div className="font-normal sm:hidden text-left py-2">
                    <p>Количество случаев: {stat.cases}</p>
                    <p>Количество смертей: {stat.deaths}</p>
                    <p>Количество случаев всего: {stat.totalCases}</p>
                    <p>Количество смертей всего: {stat.totalDeaths}</p>
                    <p>
                      Количество случаев на 1000 жителей:{" "}
                      {stat.popThousandCases}
                    </p>
                    <p>
                      Количество смертей на 1000 жителей:{" "}
                      {stat.popThousandDeaths}
                    </p>
                  </div>
                </td>
                <td className="hidden text-gray-500 sm:table-cell">
                  <>{stat.cases}</>
                </td>
                <td className="hidden text-gray-500 sm:table-cell">
                  <>{stat.deaths}</>
                </td>
                <td className="hidden text-gray-500 sm:table-cell">
                  <>{stat.totalCases}</>
                </td>
                <td className="hidden text-gray-500 sm:table-cell">
                  <>{stat.totalDeaths}</>
                </td>
                <td className="hidden text-gray-500 sm:table-cell">
                  <>{stat.popThousandCases}</>
                </td>
                <td className="hidden text-gray-500 sm:table-cell">
                  <>{stat.popThousandDeaths}</>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          statsPerPage={statsPerPage}
          totalStats={allListData.length}
          paginate={handlePaginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};
export default CovidStatList;
