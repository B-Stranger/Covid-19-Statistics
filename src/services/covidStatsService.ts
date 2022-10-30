import { CovidStats } from "../clients";
import { AggregatedCovidStat, DateRangeStat } from "./models";

export const getAggregatedStats = (
  stats: CovidStats[],
  country?: string,
  dateFrom?: Date,
  dateTo?: Date
): AggregatedCovidStat[] => {
  let countries: {
    [country: string]: AggregatedCovidStat;
  } = {};

  for (const {
    //object deconstruction
    day,
    month,
    year,
    cases,
    deaths,
    countriesAndTerritories,
    popData2019, // add later
  } of country
    ? stats.filter((x) => x.countriesAndTerritories === country) // for getting only one specific country(if needed)
    : stats) {
    if (!countries[countriesAndTerritories]) {
      countries[countriesAndTerritories] = {
        cases: 0,
        deaths: 0,
        totalCases: 0,
        totalDeaths: 0,
      };
    }
    // for getting only one data from the specif date(if needed)
    const statDate = new Date(Number(year), Number(month), Number(day));
    if (dateFrom && dateTo) {
      if (statDate >= dateFrom && statDate <= dateTo) {
        countries[countriesAndTerritories].cases += cases;
        countries[countriesAndTerritories].deaths += deaths;
      }
    } else if (dateFrom) {
      if (statDate >= dateFrom) {
        countries[countriesAndTerritories].cases += cases;
        countries[countriesAndTerritories].deaths += deaths;
      }
    } else if (dateTo) {
      if (statDate <= dateTo) {
        countries[countriesAndTerritories].cases += cases;
        countries[countriesAndTerritories].deaths += deaths;
      }
    } else {
      countries[countriesAndTerritories].cases += cases;
      countries[countriesAndTerritories].deaths += deaths;
    }
    countries[countriesAndTerritories].totalCases += cases;
    countries[countriesAndTerritories].totalDeaths += deaths;
  }

  let aggregatedStats: AggregatedCovidStat[] = [];
  for (let key in countries) {
    aggregatedStats.push({ ...countries[key], country: key });
  }
  return aggregatedStats;
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
