import React, {useEffect} from "react";
import {fetchAllTransactionsToBarChart,} from "@services/transactionService.tsx";
import {BarCharts} from "@components/common/charts/BarCharts.tsx";


type homePieChartProps = {
    from: string;
    to: string;
}

export function HomeBarChart({ from, to }: homePieChartProps) {
    const [homeLineChartData, setHomeLineChartData] = React.useState([]);

    const fetchHomeBarChart = async()=>  {
        try {
            const data = await fetchAllTransactionsToBarChart(
                {from, to})
            console.log(data)
            setHomeLineChartData(data)
        } catch (error) {
            console.error("Error fetching home bar chart data:", error);
        }
    }

    useEffect(() => {
        fetchHomeBarChart();
    }, [from, to]);
    return (
        <BarCharts data={homeLineChartData}/>
    )
}