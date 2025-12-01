import PieCharts from "@components/common/charts/PieCharts.tsx";
import React, {useEffect, useState} from "react";
import {fetchWalletTransactionsToPieChart} from "@services/transactionService.tsx";

type WalletPieChartProps = {
    walletId: string;
    from: string;
    to: string;
}

export function WalletPieChart({ walletId, from, to }: WalletPieChartProps) {
    const [data, setData] = useState<{ name: string; value: number; type: string }[]>([]);

    const load = async () => {
        try {
            const income = await fetchWalletTransactionsToPieChart({ id: walletId, from, to }, "income");
            const expense = await fetchWalletTransactionsToPieChart({ id: walletId, from, to }, "else");

            const mappedIncome = income.map((i: { category: string; amount: number }) => ({
                name: i.category,
                value: i.amount,
                type: "income"
            }));
            const mappedExpense = expense.map((e: { category: string; amount: number }) => ({
                name: e.category,
                value: e.amount,
                type: "expense"
            }));

            setData([...mappedIncome, ...mappedExpense]);
        } catch (e) {
            console.error("Błąd pobierania:", e);
        }
    };

    useEffect(() => {
        load()
    }, [walletId, from, to]);

    const colorMapper = (item: { type?: string }) =>
        item.type === "income" ? "#008000" : "#FF2C2C";
    return <PieCharts data={data} colorMapper={colorMapper}/>

}