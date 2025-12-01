import React, {useEffect} from "react";
import {fetchAccountTransactionsToLineChart,} from "@services/transactionService.tsx";
import {LineCharts} from "@components/common/charts/LineCharts.tsx";


type accountPieChartProps = {
    accountId: string;
    from: string;
    to: string;
}

export function AccountLineChart({ accountId, from, to }: accountPieChartProps) {
    const [accountLineChartData, setAccountLineChartData] = React.useState([]);

    const fetchAccountData = async()=>  {
        try {
            const data = await fetchAccountTransactionsToLineChart(
                {id: accountId, from, to})
            setAccountLineChartData(data)
        } catch (error) {
            console.error("Error fetching account line chart data:", error);
        }
    }

    useEffect(() => {
        fetchAccountData();
    }, [accountId, from, to]);
    return (
        <LineCharts data={accountLineChartData}/>
    )
}