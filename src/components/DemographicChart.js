
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Papa from 'papaparse';

export default function DemographicChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/data/demographic_predicted.csv')
      .then(response => response.text())
      .then(csv => {
        Papa.parse(csv, {
          header: true,
          dynamicTyping: true,
          complete: (result) => setData(result.data),
        });
      });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 30, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pop_0_14" stroke="#8884d8" name="0-14세" />
        <Line type="monotone" dataKey="pop_15_64" stroke="#82ca9d" name="15-64세" />
        <Line type="monotone" dataKey="pop_65_plus" stroke="#ffc658" name="65세 이상" />
      </LineChart>
    </ResponsiveContainer>
  );
}
