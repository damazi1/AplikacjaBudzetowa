import React from "react";
import {HomeBarChart} from "@components/home/HomeBarChart.tsx";

type HomeChartsProps = {
    dateFrom: string;
    dateTo: string;
};

export const HomeCharts: React.FC<HomeChartsProps> = ({
                                                                dateFrom,
                                                                dateTo,
                                                            })=> {
    return (
        <div>
            <HomeBarChart from={dateFrom} to={dateTo}/>
        </div>
    );
}