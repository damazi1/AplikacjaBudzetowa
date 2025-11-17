import React from "react";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";


const sampleData = [
    { date: "2025-11-01", saldo: 5 },
    { date: "2025-11-02", saldo: 10 },
    { date: "2025-11-03", saldo: 15 },
    { date: "2025-11-04", saldo: 25 },
    { date: "2025-11-05", saldo: 20 },
    { date: "2025-11-06", saldo: 30 },
    { date: "2025-11-07", saldo: 40 },
    { date: "2025-11-08", saldo: 100 },
    { date: "2025-11-09", saldo: 250 },
    { date: "2025-11-10", saldo: 50 },
];

export function LineCharts() {

    return (
        <ResponsiveContainer  width={"100%"} height={400}>
            <LineChart
                width={500}
                height={300}
                data={sampleData}
            >
                <CartesianGrid stroke="#ccc"/>
                <XAxis dataKey="date"/>
                <YAxis/>
                <Tooltip/>
                <Line type="monotone" dataKey="saldo" stroke="#8884d8"/>
            </LineChart>
        </ResponsiveContainer>
    )
}