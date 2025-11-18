import React from "react";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";


export function LineCharts({
                               data}
                           : {data: {date: string, balance: number}[];
}) {
    const getYAxisDomain = (dataKey: string, data: any[]) => {
        const values = data.map(d => d[dataKey]);
        const min = Math.min(...values);
        const max = Math.max(...values);
        const padding = (max - min) * 0.1 || 1; // minimalny padding

        return [min - padding, max + padding];
    };
    const [yMin, yMax] = getYAxisDomain('balance', data);

    return (
        <ResponsiveContainer  width={"100%"} height={400}>
            <LineChart
                width={500}
                height={300}
                data={data}
            >
                <CartesianGrid stroke="#ccc"/>
                <XAxis dataKey="date"/>
                <YAxis domain={[yMin, yMax]}
                       tickFormatter={(value) => Math.round(value).toLocaleString('pl-PL')}
                />
                <Tooltip/>
                <Line type="monotone" dataKey="balance" stroke="#8884d8"/>
            </LineChart>
        </ResponsiveContainer>
    )
}