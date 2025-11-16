import React, {useEffect, useState} from "react";
import {Card, Col, Row} from "antd";
import {fetchTransactions} from "@services/transactionService.tsx";
import {useParams} from "react-router-dom";

type AccountTransactionsProps = {
    amount: number;
    description?: string;
    date?: Date;
}

export function AccountTransactions() {
    const [transactions, setTransactions] = useState<AccountTransactionsProps[]>([]);
    const {accountId} = useParams<{accountId: string}>();
    const fetchTrans = async () => {
        if (!accountId) return;
        try {
            const data = await fetchTransactions(accountId);
            console.log(data);
            setTransactions(data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    }
    useEffect(() => {
        fetchTrans();
    }, []);

    return (
        <Card title={"Historia transakcji"}>
            <Row>
                <Col span={8}>
                    <strong>Kwota</strong>
                </Col>
                <Col span={8}>
                    <strong>Opis</strong>
                </Col>
                <Col span={8}>
                    <strong>Data</strong>
                </Col>
            </Row>
            {transactions.map((transaction, index) => (
                <Row key={index} style={{marginTop: "10px"}}>
                    <Col span={8}>{transaction.amount.toFixed(2)} PLN</Col>
                    <Col span={8}>{transaction.description || "-"}</Col>
                    <Col span={8}>{transaction.date ? new Date(transaction.date).toLocaleDateString() : "-"}</Col>
                </Row>
            ))}
        </Card>
    );
}