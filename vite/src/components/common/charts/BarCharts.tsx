import React from "react";
import {BarChart, Bar, ResponsiveContainer, Legend, CartesianGrid, Tooltip, YAxis, XAxis} from 'recharts';

export function BarCharts({
                              data}
                          : {data: {date: string, income: number, expenses: number}[];
}) {
    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={data}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="income" fill="#008000" />
                <Bar dataKey="expenses" fill="#FF2C2C" />
            </BarChart>
        </ResponsiveContainer>
    );
}