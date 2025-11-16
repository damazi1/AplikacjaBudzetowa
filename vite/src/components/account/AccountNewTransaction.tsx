import React from "react";
import {Card, Tabs} from "antd";
import {AccountTransactionForm} from "@components/account/AccountTransactionForm.tsx";
import {AccountTransferForm} from "@components/account/AccountTransferForm.tsx";


export function AccountNewTransaction() {
    return (
        <Card title={"Nowa transakcja"}>
            <Tabs>
                <Tabs.TabPane tab="Wpłata" key="deposit">
                    <AccountTransactionForm type="deposit"/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Wypłata" key="withdrawal">
                    <AccountTransactionForm type="withdrawal"/>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Przelew" key="transfer">
                    <AccountTransferForm/>
                </Tabs.TabPane>
            </Tabs>
        </Card>
    )
}