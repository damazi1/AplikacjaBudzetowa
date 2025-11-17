import React from "react";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";


export function LineCharts({
                               data}
                           : {data: {date: string, balance: number}[];
}) {
    return (
        <ResponsiveContainer  width={"100%"} height={400}>
            <LineChart
                width={500}
                height={300}
                data={data}
            >
                <CartesianGrid stroke="#ccc"/>
                <XAxis dataKey="date"/>
                <YAxis/>
                <Tooltip/>
                <Line type="monotone" dataKey="balance" stroke="#8884d8"/>
            </LineChart>
        </ResponsiveContainer>
    )
}