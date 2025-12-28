import React from "react";
import {Card, Tabs, type TabsProps} from "antd";
import {AccountTransactionForm} from "@components/account/AccountTransactionForm.tsx";
import {AccountTransferForm} from "@components/account/AccountTransferForm.tsx";
import {useTranslation} from "react-i18next";


export function AccountNewTransaction() {
    const {t} = useTranslation();
    const items: TabsProps["items"] = [
        {
            key: "deposit",
            label: t("Deposit"),
            children: <AccountTransactionForm type="deposit" />
        },
        {
            key: "withdrawal",
            label: t("Withdrawal"),
            children: <AccountTransactionForm type="withdrawal" />
        },
        {
            key: "transfer",
            label: t("Transfer"),
            children: <AccountTransferForm />
        }
    ];
    return (
        <Card title={t("New Transaction")}>
            <Tabs items={items}/>
        </Card>
    )
}