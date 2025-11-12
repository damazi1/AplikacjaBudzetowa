import React, {type JSX} from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import { Card, Col, Row } from "antd";

const data = [
    { name: "Przychody", value: 5000 },
    { name: "Wydatki", value: 3200 },
    { name: "Oszczędności", value: 1800 },
];

const barChartData = [
    { name: 'Finanse', przychody: 5000, wydatki: 3200 },
];

const generateLineChartData = () => {
    const data = [];
    let balance = 3000; // Początkowy balans
    for (let i = 1; i <= 30; i++) {
        balance += Math.random() * 600 - 300; // Losowa zmiana balansu każdego dnia
        data.push({
            date: `${i}.11`,
            balans: Math.max(0, Math.round(balance)), // Balans nie może być ujemny
        });
    }
    return data;
};

const lineChartData = generateLineChartData();

const COLORS = ["#4caf50", "#f44336", "#2196f3"];

export function WalletCharts(): JSX.Element {
    return (
        <Row>
            <Col span={12}>
                <Card hoverable title="Podsumowanie portfela" style={{margin: "25px"}}>
                    <PieChart width={400} height={300}>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            label={(entry: any) => entry.name}
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `${value.toFixed(2)} PLN`} />
                        <Legend verticalAlign="bottom" />
                    </PieChart>
                </Card>
            </Col>
            <Col span={12}>
                <Card hoverable title="Przychody vs Wydatki" style={{margin: "25px"}}>
                    <BarChart
                        width={450}
                        height={300}
                        data={barChartData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => `${value.toFixed(2)} PLN`} />
                        <Legend verticalAlign="bottom" />
                        <Bar dataKey="przychody" fill="#4caf50" />
                        <Bar dataKey="wydatki" fill="#f44336" />
                    </BarChart>
                </Card>
            </Col>
            <Col span={12}>
                <Card hoverable title="Balans w listopadzie" style={{ margin: "25px 0" }}>
                    <LineChart
                        width={450}
                        height={300}
                        data={lineChartData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip formatter={(value: number) => `${value.toFixed(2)} PLN`} />
                        <Legend verticalAlign="bottom" />
                        <Line type="monotone" dataKey="balans" stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </Card>
            </Col>
        </Row>
    );
}