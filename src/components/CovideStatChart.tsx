import React from "react";
import { CovidStats } from "../clients";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

const data = [
  { name: "Day 1", uv: 400, pv: 200, amt: 200 },
  { name: "Day 2", uv: 200, pv: 200, amt: 200 },
  { name: "Day 3", uv: 150, pv: 200, amt: 200 },
];

const CovidStatChart = () => {
  return (
    <div>
      <LineChart width={800} height={400} data={data} className="m-auto">
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    </div>
  );
};
export default CovidStatChart;
