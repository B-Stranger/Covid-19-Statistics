import React, { useEffect, useState } from "react";
import "./App.css";
import CovidStatList from "./components/CovidStatList";
import CovidStatChart from "./components/CovideStatChart";
import { CovidApiClient } from "./clients";
import classNames from "classnames";
import { getAggregatedStats } from "./services/covidStatsService";
import { AggregatedCovidStat } from "./services/models";

function App() {
  const [tableActive, setTableActive] = useState<boolean>(true);
  const [data, setData] = useState<AggregatedCovidStat[]>([]);
  const client = new CovidApiClient();

  useEffect(() => {
    const fetchData = async () => {
      const stats = await client.getCovidStats();
      const aggregatedStats = getAggregatedStats(stats).byCountry();
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
      <div className="flex flex-col">
        <div className="self-start px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setTableActive(!tableActive)}
            className={classNames("inline-flex", {
              active: tableActive,
            })}
          >
            Таблица
          </button>
          <button
            onClick={() => setTableActive(!tableActive)}
            className={classNames("inline-flex", {
              active: !tableActive,
            })}
          >
            График
          </button>
        </div>
        {showData(tableActive)}
      </div>
    </div>
  );
}

export default App;
