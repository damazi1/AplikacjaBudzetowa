import React from "react";
import {BarChart, Bar, ResponsiveContainer, Legend, CartesianGrid, Tooltip, YAxis, XAxis} from 'recharts';

const getYAxisDomain = (data: { income: number; expenses: number }[]) => {
    if (!data.length) return [0, 0];

    const allValues = data.flatMap(d => [d.income, d.expenses]);
    const min = Math.min(...allValues);
    const max = Math.max(...allValues);
    const padding = (max - min) * 0.1 || 10;

    return [Math.max(0, min - padding), max + padding];
};

export function BarCharts({
                              data,
                          }: {
    data: { date: string; income: number; expenses: number }[];
}) {
    const [yMin, yMax] = getYAxisDomain(data);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[yMin, yMax]} allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#008000" />
                <Bar dataKey="expenses" fill="#FF2C2C" />
            </BarChart>
        </ResponsiveContainer>
    );
}