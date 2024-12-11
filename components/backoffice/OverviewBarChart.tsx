'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Rectangle,
  ResponsiveContainer,
} from "recharts";

export default function OverViewBarCahrt<T>({ data }: { data: T[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="key" />
        <Tooltip />
        <Bar dataKey="value" fill="#e11d48" />
      </BarChart>
    </ResponsiveContainer>
  );
}
