import "./App.css";
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import Combobox from "react-widgets/Combobox";

import CovidStatList from "./components/CovidStatList";
import CovidStatChart from "./components/CovideStatChart";
import { CovidApiClient } from "./clients";
import { getAggregatedStats, AggregatedCovidStat } from "./services";

function App() {
  const [tableActive, setTableActive] = useState<boolean>(true);
  const [data, setData] = useState<AggregatedCovidStat[]>([]);

  const client = new CovidApiClient();

  useEffect(() => {
    const fetchData = async () => {
      const stats = await client.getCovidStats();
      const aggregatedStats = getAggregatedStats(
        stats,
        "Afghanistan",
        new Date(2020, 12, 12),
        new Date(2020, 12, 14)
      );
      setData(aggregatedStats);
    };
    fetchData();
  }, []);

  const showData = (tableActive: boolean) => {
    if (tableActive) {
      return <CovidStatList data={data} />;
    } else {
      return <CovidStatChart />;
    }
  };

  return (
    <div className="App">
      <h1 className="p-4">Covid 19 Statistics</h1>
      <h2>From 21/12/2020 To 21/12/2020</h2>
      <div className="flex flex-col">
        <div className="self-start px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setTableActive(!tableActive)}
            className={classNames("inline-flex btn-primary", {
              active: tableActive,
            })}
          >
            Таблица
          </button>
          <button
            onClick={() => setTableActive(!tableActive)}
            className={classNames("inline-flex selection:btn-primary", {
              active: !tableActive,
            })}
          >
            График
          </button>
        </div>
        <div className="flex flex-row">
          <div className="">
            <Combobox
              className="m-40 border border-r-4 border-gray-400 "
              defaultValue="Yellow"
              data={["Red", "Yellow", "Blue", "Orange"]}
            />
          </div>

          <div>Country Search</div>
        </div>
        {showData(tableActive)}
      </div>
    </div>
  );
}

export default App;
