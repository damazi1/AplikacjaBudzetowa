import React, {useEffect, useState} from "react";
import {Card, Col, Row} from "antd";
import {fetchTransactions} from "@services/transactionService.tsx";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

type AccountTransactionsProps = {
    amount: number;
    description?: string;
    date?: Date;
    currency: string;
}

export function AccountTransactions() {
    const [transactions, setTransactions] = useState<AccountTransactionsProps[]>([]);
    const {accountId} = useParams<{accountId: string}>();
    const {t} = useTranslation();
    const fetchTrans = async () => {
        if (!accountId) return;
        try {
            const data = await fetchTransactions(accountId);
            setTransactions(data);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    }
    useEffect(() => {
        fetchTrans();
    }, []);

    return (
        <Card title={t("Transaction history")}>
            <Row>
                <Col span={8}>
                    <strong>{t("Amount")}</strong>
                </Col>
                <Col span={8}>
                    <strong>{t("Description")}</strong>
                </Col>
                <Col span={8}>
                    <strong>{t("Date")}</strong>
                </Col>
            </Row>
            {transactions.map((transaction, index) => (
                <Row key={index} style={{marginTop: "10px"}}>
                    <Col span={8}>{transaction.amount.toFixed(2)} {transaction.currency}</Col>
                    <Col span={8}>{transaction.description || "-"}</Col>
                    <Col span={8}>{transaction.date ? new Date(transaction.date).toLocaleDateString() : "-"}</Col>
                </Row>
            ))}
        </Card>
    );
}