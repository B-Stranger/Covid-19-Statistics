import React, { useEffect, useState } from "react";
import { CovidStats } from "../clients";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AggregatedByDateCovidStat, getAggregatedStats } from "../services";

interface CovidStatsChartProps {
  data: CovidStats[];
  startDate: Date;
  endDate: Date;
  selectedCountry: string;
}

const CovidStatChart: React.FC<CovidStatsChartProps> = ({
  data,
  startDate,
  endDate,
  selectedCountry,
}) => {
  const [chartData, setChartData] = useState<AggregatedByDateCovidStat[]>([]);

  useEffect(() => {
    const aggregatedStats = getAggregatedStats(
      data,
      startDate,
      endDate,
      selectedCountry
    );
    setChartData(aggregatedStats.byDate());
    console.log(aggregatedStats.byDate());
  }, [startDate, endDate, selectedCountry, data]);

  return (
    <div className="py-6 m-auto ">
      <LineChart
        data={chartData}
        width={window.innerWidth / 1.5}
        height={window.innerHeight / 1.5}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <Legend />
        <YAxis dataKey="cases" />
        s
        <Line
          type="monotone"
          dataKey="cases"
          stroke="orange"
          dot={false}
          name="Случаи"
        />
        <Line
          type="monotone"
          dataKey="deaths"
          stroke="red"
          dot={false}
          name="Смерти"
        />
      </LineChart>
    </div>
  );
};
export default CovidStatChart;
