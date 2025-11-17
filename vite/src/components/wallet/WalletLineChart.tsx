import React, {useEffect} from "react";
import {fetchWalletTransactionsToLineChart} from "@services/transactionService.tsx";
import {LineCharts} from "@components/common/charts/LineCharts.tsx";


type WalletPieChartProps = {
    walletId: string;
    from: string;
    to: string;
}

export function WalletLineChart({ walletId, from, to }: WalletPieChartProps) {
    const [walletLineChartData, setWalletLineChartData] = React.useState([]);

    const fetchWalletData = async()=>  {
        try {
            const data = await fetchWalletTransactionsToLineChart(
                {id: walletId, from, to})
            console.log(data)
            setWalletLineChartData(data)
        } catch (error) {
            console.error("Error fetching wallet pie chart data:", error);
        }
    }

    useEffect(() => {
        fetchWalletData();
    }, [walletId, from, to]);
    return (
        <LineCharts data={walletLineChartData}/>
    )
}