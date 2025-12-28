import React, {useMemo} from "react";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useTranslation} from "react-i18next";


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
    const {t} = useTranslation();
    const formattedData = useMemo(() =>
        data.map(item => ({
            ...item,
            balance: Math.round(item.balance * 100) / 100
        })), [data]);
    return (
        <ResponsiveContainer  width={"100%"} height={400}>
            <LineChart
                width={500}
                height={300}
                data={formattedData}
            >
                <CartesianGrid stroke="#ccc"/>
                <XAxis dataKey="date"/>
                <YAxis domain={[yMin, yMax]}
                       tickFormatter={(value) => value.toFixed(2)}
                />
                <Tooltip/>
                <Line type="monotone" name={t("Balance")} dataKey="balance" stroke="#8884d8"/>
            </LineChart>
        </ResponsiveContainer>
    )
}