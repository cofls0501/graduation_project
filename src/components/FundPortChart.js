import React, { useEffect, useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Papa from 'papaparse';

export default function FundPortChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/data/fund_port_predicted.csv')
      .then(response => response.text())
      .then(csv => {
        Papa.parse(csv, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          complete: (result) => {
            setData(result.data);
          },
        });
      });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={data}
        stackOffset="expand"
        margin={{ top: 30, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="welfare" stackId="1" stroke="#8884d8" fill="#8884d8" name="복지부문" />
        <Area type="monotone" dataKey="finance" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="금융부문" />
        <Area type="monotone" dataKey="others" stackId="1" stroke="#ffc658" fill="#ffc658" name="기타부문" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
