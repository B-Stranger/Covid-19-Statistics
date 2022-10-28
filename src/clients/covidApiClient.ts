import axios, { AxiosRequestConfig } from "axios";
import { CaseDistributionResponse, CovidStats } from "./responses";

export class CovidApiClient {
  private config: AxiosRequestConfig;
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.REACT_APP_CODIV_API_URL as string;
    this.config = {
      baseURL: this.baseUrl,
    };
  }

  public async getCovidStats(): Promise<CovidStats[]> {
    try {
      const res = await axios.get<CaseDistributionResponse>(
        "covid19/casedistribution/json/",
        this.config
      );
      return res.data.records;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
}
