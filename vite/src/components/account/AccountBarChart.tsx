
import React, {useEffect} from "react";
import {fetchAccountTransactionsToBarChart} from "@services/transactionService.tsx";

import {BarCharts} from "@components/common/charts/BarCharts.tsx";

type AccountPieChartProps = {
    accountId: string;
    from: string;
    to: string;
}

export function AccountBarChart({ accountId, from, to }: AccountPieChartProps) {
    const [accountBarChartData, setAccountBarChartData] = React.useState([]);

    const fetchAccountData = async()=>  {
        try {
            const data = await fetchAccountTransactionsToBarChart(
                {id: accountId, from, to})
            setAccountBarChartData(data)
        } catch (error) {
            console.error("Error fetching account bar chart data:", error);
        }
    }

    useEffect(() => {
        fetchAccountData();
    }, [accountId, from, to]);
    return (
        <BarCharts data={accountBarChartData}/>
    )
}