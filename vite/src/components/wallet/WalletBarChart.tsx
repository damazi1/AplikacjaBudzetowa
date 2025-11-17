import React, {useEffect} from "react";
import {fetchWalletTransactionsToBarChart} from "@services/transactionService.tsx";

import {BarCharts} from "@components/common/charts/BarCharts.tsx";

type WalletPieChartProps = {
    walletId: string;
    from: string;
    to: string;
}

export function WalletBarChart({ walletId, from, to }: WalletPieChartProps) {
    const [walletBarChartData, setWalletBatChartData] = React.useState([]);

    const fetchWalletData = async()=>  {
        try {
            const data = await fetchWalletTransactionsToBarChart(
                {id: walletId, from, to})
            console.log(data)
            setWalletBatChartData(data)
        } catch (error) {
            console.error("Error fetching wallet pie chart data:", error);
        }
    }

    useEffect(() => {
        fetchWalletData();
    }, [walletId, from, to]);
    return (
        <BarCharts data={walletBarChartData}/>
    )
}