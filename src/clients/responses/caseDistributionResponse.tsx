export interface CaseDistributionResponse {
  records: CovidStats[];
}

export interface CovidStats {
  dateRep: Date;
  day: string;
  year: string;
  month: string;
  cases: number;
  deaths: number;
  countriesAndTerritories: string;
  geoId: string;
  countryterritoryCode: string;
  popData2019: number;
  continentExp: string;
  "Cumulative_number_for_14_days_of_COVID-19_cases_per_100000": string;
}
