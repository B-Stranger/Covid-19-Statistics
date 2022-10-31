export interface AggregatedByCountryCovidStat {
  country?: string;
  cases: number;
  deaths: number;
  totalCases: number;
  totalDeaths: number;
  popThousandCases: number;
  popThousandDeaths: number;
  popData?: number;
}
