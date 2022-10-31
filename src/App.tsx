import "./App.css";
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import CovidStatList from "./components/CovidStatList";
import CovidStatChart from "./components/CovideStatChart";
import { CovidApiClient, CovidStats } from "./clients";
import {
  getAggregatedStats,
  AggregatedCovidStat,
  getMinMaxDate,
  getAllCountries,
} from "./services";
import dayjs from "dayjs";

function App() {
  const client = new CovidApiClient();

  const [allData, setAllData] = useState<CovidStats[]>([]);
  const [tableActive, setTableActive] = useState<boolean>(true);
  const [data, setData] = useState<AggregatedCovidStat[]>([]);

  const [minDate, setMinDate] = useState<Date>(new Date());
  const [maxDate, setMaxDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const [countries, setCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const handelStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(new Date(event.target.value));
  };
  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(new Date(event.target.value));
  };
  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };
  const handleFilterReset = () => {
    setStartDate(minDate);
    setEndDate(maxDate);
    setSelectedCountry("");
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await client.getCovidStats(); // all data
      setMinDate(getMinMaxDate(data).minDate); //min date
      setMaxDate(getMinMaxDate(data).maxDate); //max date
      setStartDate(getMinMaxDate(data).minDate); //filter date from
      setEndDate(getMinMaxDate(data).maxDate); //filter date to
      setCountries(getAllCountries(data)); // all countries
      setAllData(data); //save data for aggregation
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const updateParams = () => {
      const aggregatedStats = getAggregatedStats(
        allData,
        startDate,
        endDate,
        selectedCountry
      );
      setData(aggregatedStats);
    };
    updateParams();
  }, [startDate, endDate, selectedCountry, allData]);

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
      <h2>
        <>
          С {startDate.toLocaleDateString()} По {endDate.toLocaleDateString()}
        </>
      </h2>
      <div className="flex flex-col px-4 sm:px-6 lg:px-8">
        <div className="self-start ">
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
            className={classNames("inline-flex btn-primary", {
              active: !tableActive,
            })}
          >
            График
          </button>
        </div>

        <div className="flex flex-row items-center py-2">
          <h3>Считать данные с</h3>
          <input
            type="date"
            className="mx-1 rounded-md"
            min={dayjs(minDate).format("YYYY-MM-DD")}
            max={dayjs(endDate).format("YYYY-MM-DD")}
            value={dayjs(startDate).format("YYYY-MM-DD")}
            onChange={handelStartDateChange}
          />
          <h3>по</h3>
          <input
            type="date"
            className="mx-1 rounded-md"
            min={dayjs(startDate).format("YYYY-MM-DD")}
            max={dayjs(maxDate).format("YYYY-MM-DD")}
            value={dayjs(endDate).format("YYYY-MM-DD")}
            onChange={handleEndDateChange}
          />
          <button
            className="inline-flex btn-secondary mx-1"
            onClick={handleFilterReset}
          >
            Сбросить все фильтры
          </button>
        </div>
        <div className=" flex flex-row items-center py-2">
          <h3>Искать по стране: </h3>
          <div>
            <select
              id="location"
              name="location"
              className="mt-1 mx-1 px-9 block"
              defaultValue=""
              value={selectedCountry}
              onChange={handleCountryChange}
            >
              <>
                <option value={""}>Искать по всем странам</option>
                {countries.map((x, index) => (
                  <option key={index}>{x}</option>
                ))}
              </>
            </select>
          </div>
        </div>
        {showData(tableActive)}
      </div>
    </div>
  );
}

export default App;
