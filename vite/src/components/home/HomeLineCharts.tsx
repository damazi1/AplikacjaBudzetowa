import React, {useEffect} from "react";
import {fetchAllTransactionsToLineChart,} from "@services/transactionService.tsx";
import {LineCharts} from "@components/common/charts/LineCharts.tsx";


type homePieChartProps = {
    from: string;
    to: string;
}

export function HomeLineChart({ from, to }: homePieChartProps) {
    const [homeLineChartData, setHomeLineChartData] = React.useState([]);

    const fetchHomeData = async()=>  {
        try {
            const data = await fetchAllTransactionsToLineChart(
                {from, to}
            )
            setHomeLineChartData(data)
        } catch (error) {
            console.error("Error fetching home line chart data:", error);
        }
    }

    useEffect(() => {
        fetchHomeData();
    }, [from, to]);
    return (
        <LineCharts data={homeLineChartData}/>
    )
}