import PieCharts from "@components/common/charts/PieCharts.tsx";
import React, {useEffect} from "react";
import {fetchWalletTransactionsToPieChart} from "@services/transactionService.tsx";
import {Col, Row} from "antd";

type WalletPieChartProps = {
    walletId: string;
    from: string;
    to: string;
}

export function WalletPieChart({ walletId, from, to }: WalletPieChartProps) {
    const [walletIncomeData, setWalletIncomeData] = React.useState([]);
    const [walletExpenseData, setWalletExpenseData] = React.useState([]);

    const fetchWalletData = async(operator: string)=>  {
        try {
            const data = await fetchWalletTransactionsToPieChart(
                {id: walletId, from, to}
                , operator)
            const mappedData = data.map((item: { category: string; amount: number }) => ({
                name: item.category,
                value: item.amount
            }));
            console.log(data)
            if (operator === "income") {
                setWalletIncomeData(mappedData);
            } else {
                setWalletExpenseData(mappedData);
            }
        } catch (error) {
            console.error("Error fetching wallet pie chart data:", error);
        }
    }

    useEffect(() => {
        fetchWalletData("income");
        fetchWalletData("else");
    }, [walletId, from, to]);
    return (
        <Row>
            <Col span={12}>
                <PieCharts data={walletIncomeData} color={"#008000"}/>

            </Col>
            <Col span={12}>
                <PieCharts data={walletExpenseData} color={"#FF2C2C"}/>
            </Col>
        </Row>
    )
}