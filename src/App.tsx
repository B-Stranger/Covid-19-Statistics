import './App.css';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import CovidStatList from './components/CovidStatList';
import CovidStatChart from './components/CovideStatChart';
import { CovidApiClient, CovidStats } from './clients';
import { getMinMaxDate, getAllCountries } from './services';
import dayjs from 'dayjs';

function App() {
  const client = new CovidApiClient();

  const [allData, setAllData] = useState<CovidStats[]>([]);
  const [tableActive, setTableActive] = useState<boolean>(true);

  const [minDate, setMinDate] = useState<Date>(new Date());
  const [maxDate, setMaxDate] = useState<Date>(new Date());
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

  const [countries, setCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [statsToShow, setStatsToSow] = useState<number>(20);

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
    setSelectedCountry('');
    setStatsToSow(20);
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await client.getCovidStats(); // all data
      const minData = getMinMaxDate(data).minDate;
      const maxData = getMinMaxDate(data).maxDate;
      setMinDate(minData); //min date
      setMaxDate(maxData); //max date
      setStartDate(minData); //filter date from
      setEndDate(maxData); //filter date to
      setCountries(getAllCountries(data)); // all countries
      setAllData(data); //save data for aggregation
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showData = (tableActive: boolean) => {
    if (tableActive) {
      return (
        <CovidStatList
          data={allData}
          startDate={startDate}
          endDate={endDate}
          selectedCountry={selectedCountry}
          statsToShow={statsToShow}
        />
      );
    } else {
      return (
        <CovidStatChart
          data={allData}
          startDate={startDate}
          endDate={endDate}
          selectedCountry={selectedCountry}
        />
      );
    }
  };

  return (
    <div className="App">
      <h1 className="p-4">Covid 19 Statistics</h1>
      <h2>
        <>
          ?? {startDate.toLocaleDateString()} ???? {endDate.toLocaleDateString()}
        </>
      </h2>
      <div className="flex flex-col px-4 sm:px-6 lg:px-8">
        <div className="self-start ">
          <button
            onClick={() => setTableActive(!tableActive)}
            className={classNames('inline-flex btn-primary', {
              active: tableActive,
            })}
          >
            ??????????????
          </button>
          <button
            onClick={() => setTableActive(!tableActive)}
            className={classNames('inline-flex btn-primary', {
              active: !tableActive,
            })}
          >
            ????????????
          </button>
        </div>

        <div className="flex flex-row items-center py-2">
          <h3>?????????????? ???????????? ??</h3>
          <input
            type="date"
            className="mx-1 rounded-md"
            min={dayjs(minDate).format('YYYY-MM-DD')}
            max={dayjs(endDate).format('YYYY-MM-DD')}
            value={dayjs(startDate).format('YYYY-MM-DD')}
            onChange={handelStartDateChange}
          />
          <h3>????</h3>
          <input
            type="date"
            className="mx-1 rounded-md"
            min={dayjs(startDate).format('YYYY-MM-DD')}
            max={dayjs(maxDate).format('YYYY-MM-DD')}
            value={dayjs(endDate).format('YYYY-MM-DD')}
            onChange={handleEndDateChange}
          />
          <button
            className="inline-flex btn-secondary mx-1"
            onClick={handleFilterReset}
          >
            ???????????????? ?????? ??????????????
          </button>
        </div>
        <div className=" flex flex-row items-center py-2">
          <h3>???????????? ???? ????????????: </h3>
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
                <option value={''}>???????????? ???? ???????? ??????????????</option>
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
