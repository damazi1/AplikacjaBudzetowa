import React from "react";
import {Cell, Pie, PieChart, ResponsiveContainer, Sector, type SectorProps, Tooltip} from 'recharts';
import type {TooltipIndex} from 'recharts/types/state/tooltipSlice';

type Coordinate = {
    x: number;
    y: number;
};

type PieSectorData = {
    percent?: number;
    name?: string | number;
    midAngle?: number;
    middleRadius?: number;
    tooltipPosition?: Coordinate;
    value?: number;
    paddingAngle?: number;
    dataKey?: string;
    payload?: any;
};

type PieSectorDataItem = React.SVGProps<SVGPathElement> & Partial<SectorProps> & PieSectorData;

const renderActiveShape = ({
                               cx,
                               cy,
                               midAngle,
                               innerRadius,
                               outerRadius,
                               startAngle,
                               endAngle,
                               fill,
                               payload,
                               percent,
                               value,
                           }: PieSectorDataItem) => {
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * (midAngle ?? 1));
    const cos = Math.cos(-RADIAN * (midAngle ?? 1));
    const sx = (cx ?? 0) + ((outerRadius ?? 0) + 10) * cos;
    const sy = (cy ?? 0) + ((outerRadius ?? 0) + 10) * sin;
    const mx = (cx ?? 0) + ((outerRadius ?? 0) + 30) * cos;
    const my = (cy ?? 0) + ((outerRadius ?? 0) + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                {payload.name}
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={(outerRadius ?? 0) + 6}
                outerRadius={(outerRadius ?? 0) + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Kwota: ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Rate ${((percent ?? 1) * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};

export default function PieCharts({
                                      data,
                                      colorMapper,
                                      isAnimationActive = true,
                                      defaultIndex = undefined,
                                  }: {
    isAnimationActive?: boolean;
    defaultIndex?: TooltipIndex;
    data: { name: string; value: number }[];
    colorMapper?: (item: { name: string; value: number; type?: string }, index: number) => string;
}) {
    return (
        <div style={{ width: "100%", maxWidth: 500, height: 400 }}>
            <ResponsiveContainer width={"100%"} height={"100%"}>
                <PieChart>
                    <Pie
                        activeShape={renderActiveShape}
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius="30%"
                        outerRadius="50%"
                        dataKey="value"
                        isAnimationActive={isAnimationActive}
                    >
                        {data.map((item, i) => (
                            <Cell key={i} fill={colorMapper ? colorMapper(item, i) : "#8884d8"} />
                        ))}
                    </Pie>
                    <Tooltip content={() => null} defaultIndex={defaultIndex} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}