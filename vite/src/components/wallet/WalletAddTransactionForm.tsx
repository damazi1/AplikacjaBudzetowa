import React from "react";
import {Card, Button, Form, InputNumber, Input, message} from "antd";
import FormItem from "antd/es/form/FormItem";
import {CategorySelect} from "./WalletCategorySelect.tsx";
import {newWalletTransaction} from "../../services/WalletService.tsx";

interface WalletAddTransactionFormProps {
    walletId: string;
}

export function WalletAddTransactionForm({walletId}: WalletAddTransactionFormProps) {
    const onSubmit = async (values: { amount: number; description?: string; category: string }) => {
        if (!walletId) {return}
        try {
            console.log(walletId);
            await newWalletTransaction(values, walletId);
            window.location.reload();
        } catch (e: any) {
            message.error(e?.message || "Błąd dodawania transakcji");
        }
    }
    return <Card title={"Add transaction"}>
        <Form layout="horizontal" onFinish={onSubmit}>
            <FormItem
                label="Amount"
                name="amount"
            >
                <InputNumber style={{width: "100%"}} placeholder={"kwota"}/>
            </FormItem>
            <FormItem
                label={"Description (optional)"}
                name="description"
            >
                <Input placeholder={"Put description here..."}/>
            </FormItem>
            <FormItem
                label={"Category"}
                name={"category"}
            >
                <CategorySelect/>
            </FormItem>
            <Button style={{width: "100%"}} type="primary" htmlType="submit"> Add</Button>
        </Form>
    </Card>
}