import { CovidStats } from "../clients";
import { AggregatedCovidStat } from "./models";

export const getAggregatedStats = (stats: CovidStats[]) => {
  return {
    byCountry(): AggregatedCovidStat[] {
      let countries: {
        [country: string]: AggregatedCovidStat;
      } = {};

      for (const {
        //object deconstruction
        dateRep,
        day,
        month,
        year,
        cases,
        deaths,
        countriesAndTerritories,
        geoId,
        countryterritoryCode,
        popData2019,
        continentExp,
      } of stats) {
        if (!countries[countriesAndTerritories]) {
          countries[countriesAndTerritories] = {
            totalCases: 0,
            totalDeaths: 0,
          };
        }

        countries[countriesAndTerritories].totalCases += cases;
        countries[countriesAndTerritories].totalDeaths += deaths;
      }

      let aggregatedStats = [];
      for (let key in countries) {
        aggregatedStats.push({ ...countries[key], country: key });
      }
      return aggregatedStats;
    },
  };
};

/*
const getCountries = (data: CovidStats[]) => {
  const uniqueCountries: any = [];
  data.filter((stat) => {
    const isDuplicate = uniqueCountries.includes(stat.countriesAndTerritories);
    if (!isDuplicate) {
      uniqueCountries.push(stat.countriesAndTerritories);
      return true;
    }
    return false;
  });
  return uniqueCountries;
};

export const covidStatsService = (data: CovidStats[]) => {
  let aggregatedByCountryStat: AggregatedCovidStat[] = [];
  const countries: any[] = getCountries(data);
  for (let i = 0; i < countries.length; i++) {
    aggregatedByCountryStat.push({
      countriesAndTerritories: countries[i],
      cases: 0,
      deaths: 0,
    });
    for (let j = 0; j < data.length; j++) {
      if (data[j].countriesAndTerritories == countries[i]) {
        aggregatedByCountryStat[i].deaths += data[j].deaths;
        aggregatedByCountryStat[i].cases += data[j].cases;
      }
    }
  }
};
*/
