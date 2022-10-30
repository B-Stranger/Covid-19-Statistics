import React from "react";
import { CovidStats } from "../clients";
import { AggregatedCovidStat } from "../services/models";

interface CovidStatsProps {
  data: AggregatedCovidStat[];
}

const CovidStatList: React.FC<CovidStatsProps> = ({ data }) => {
  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8">
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
              {data.map((stat, index) => (
                <tr key={index} className=" m-2">
                  <td className="pl-4 pr-3 font-medium text-gray-900 sm:pl-6">
                    <>{stat.country}</>
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
                    <>Temp</>
                  </td>
                  <td className="hidden text-gray-500 sm:table-cell">
                    <>Temp</>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default CovidStatList;
