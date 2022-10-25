const stat = [
  {
    country: "Afganistan",
    cases: 22,
    deaths: 1,
    totalcases: 45,
    totaldeaths: 3,
    casesbythousand: 13,
    deathsbythousand: 12,
  },
  // More people...
];

const Table = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="-mx-4 mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:-mx-6 md:mx-0 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
              >
                Страна
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
              >
                Количество случаев
              </th>
              <th
                scope="col"
                className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
              >
                Количество смертей
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Количество случаев всего
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Количество смертей всего
              </th>{" "}
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Количество случаев на 1000 жителей
              </th>
              <th
                scope="col"
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                Количество смертей на 1000 жителей
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {stat.map((data) => (
              <tr key={data.country}>
                <td className="mt-1 truncate text-gray-700">{data.country}</td>
                <td className="mt-1 truncate text-gray-700">{data.cases}</td>
                <td className="mt-1 truncate text-gray-700">{data.deaths}</td>
                <td className="mt-1 truncate text-gray-700">
                  {data.totalcases}
                </td>
                <td className="mt-1 truncate text-gray-700">
                  {data.totaldeaths}
                </td>
                <td className="mt-1 truncate text-gray-700">
                  {data.casesbythousand}
                </td>
                <td className="mt-1 truncate text-gray-700">
                  {data.deathsbythousand}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Table;
