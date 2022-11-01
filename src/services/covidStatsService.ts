import { CovidStats } from "../clients";
import {
  AggregatedByCountryCovidStat,
  AggregatedByDateCovidStat,
  DateRangeStat,
} from "./models";

const getMinDate = (stats: CovidStats[]): Date => {
  const dates = stats.map((s) =>
    Number(new Date(Number(s.year), Number(s.month) - 1, Number(s.day)))
  );
  const minDate: number = Math.min(...dates);
  return new Date(minDate);
};
const getMaxDate = (stats: CovidStats[]): Date => {
  const dates = stats.map((s) =>
    Number(new Date(Number(s.year), Number(s.month) - 1, Number(s.day)))
  );
  const maxDate: number = Math.max(...dates);
  return new Date(maxDate);
};

export const getMinMaxDate = (stats: CovidStats[]): DateRangeStat => {
  const dates: DateRangeStat = {
    minDate: getMinDate(stats),
    maxDate: getMaxDate(stats),
  };
  return dates;
};
export const getAllCountries = (stats: CovidStats[]): string[] => {
  return Array.from(new Set(stats.map((stat) => stat.countriesAndTerritories)));
};

export const getAggregatedStats = (stats: CovidStats[]) => {
  return {
    byDate(
      dateFrom?: Date,
      dateTo?: Date,
      country?: string
    ): AggregatedByDateCovidStat[] {
      var statsByDate: {
        [dateRep: string]: AggregatedByDateCovidStat;
      } = {};

      for (const { day, month, year, dateRep, cases, deaths } of country
        ? stats.filter((x) => x.countriesAndTerritories === country)
        : stats) {
        if (!statsByDate[dateRep]) {
          statsByDate[dateRep] = {
            cases: 0,
            deaths: 0,
            date: new Date(Number(year), Number(month) - 1, Number(day)),
          };
        }
        let aggregateBool = false;
        const statDate = new Date(Number(year), Number(month) - 1, Number(day));
        if (dateFrom && dateTo) {
          if (statDate >= dateFrom && statDate <= dateTo) {
            aggregateBool = true;
          }
        } else if (dateFrom) {
          if (statDate >= dateFrom) {
            aggregateBool = true;
          }
        } else if (dateTo) {
          if (statDate <= dateTo) {
            aggregateBool = true;
          }
        } else {
          aggregateBool = true;
        }
        if (aggregateBool) {
          statsByDate[dateRep].cases += cases;
          statsByDate[dateRep].deaths += deaths;
        }
      }
      let aggregatedStats: AggregatedByDateCovidStat[] = [];
      for (let key in statsByDate) {
        aggregatedStats.push({
          ...statsByDate[key],
        });
      }
      console.log(aggregatedStats);
      return aggregatedStats.reverse();
    },

    byCountry(
      dateFrom?: Date,
      dateTo?: Date,
      country?: string
    ): AggregatedByCountryCovidStat[] {
      let countries: {
        [country: string]: AggregatedByCountryCovidStat;
      } = {};

      for (const {
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
            popThousandCases: 0, //(cases / popData2019) * 1000,
            popThousandDeaths: 0, //(deaths / popData2019) * 1000,
            popData: popData2019,
          };
        }
        // for getting only one data from the specif date(if needed)
        const statDate = new Date(Number(year), Number(month) - 1, Number(day));
        let aggregateBool = false;

        if (dateFrom && dateTo) {
          if (statDate >= dateFrom && statDate <= dateTo) {
            aggregateBool = true;
          }
        } else if (dateFrom) {
          if (statDate >= dateFrom) {
            aggregateBool = true;
          }
        } else if (dateTo) {
          if (statDate <= dateTo) {
            aggregateBool = true;
          }
        } else {
          aggregateBool = true;
        }
        if (aggregateBool) {
          countries[countriesAndTerritories].cases += cases;
          countries[countriesAndTerritories].deaths += deaths;
        }

        countries[countriesAndTerritories].totalCases += cases;
        countries[countriesAndTerritories].totalDeaths += deaths;
      }

      let aggregatedStats: AggregatedByCountryCovidStat[] = [];
      for (let key in countries) {
        aggregatedStats.push({
          ...countries[key],
          country: key,
          popThousandCases:
            Math.round(
              (countries[key].totalCases / countries[key].popData) * 1000 * 100
            ) / 100,
          popThousandDeaths:
            Math.round(
              (countries[key].totalDeaths / countries[key].popData) * 1000 * 100
            ) / 100,
        });
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
