import React from "react";
import {Card, Tabs, type TabsProps} from "antd";
import {AccountTransactionForm} from "@components/account/AccountTransactionForm.tsx";
import {AccountTransferForm} from "@components/account/AccountTransferForm.tsx";


export function AccountNewTransaction() {
    const items: TabsProps["items"] = [
        {
            key: "deposit",
            label: "Wpłata",
            children: <AccountTransactionForm type="deposit" />
        },
        {
            key: "withdrawal",
            label: "Wypłata",
            children: <AccountTransactionForm type="withdrawal" />
        },
        {
            key: "transfer",
            label: "Przelew",
            children: <AccountTransferForm />
        }
    ];
    return (
        <Card title={"Nowa transakcja"}>
            <Tabs items={items}/>
        </Card>
    )
}