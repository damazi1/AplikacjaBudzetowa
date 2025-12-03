import React from "react";
import {Card, Button, Form, InputNumber, message} from "antd";
import FormItem from "antd/es/form/FormItem";
import {CategorySelect} from "./WalletCategorySelect.tsx";
import {newWalletTransaction} from "../../services/WalletService.tsx";
import TextArea from "antd/es/input/TextArea";

interface WalletAddTransactionFormProps {
    walletId: string;
}

export function WalletAddTransactionForm({walletId}: WalletAddTransactionFormProps) {
    const onSubmit = async (values: { amount: number; description?: string; category: string }) => {
        if (!walletId) {return}
        try {

            const response = await newWalletTransaction(values, walletId);
            console.log(response);
            window.location.reload();
        } catch (e: any) {
            console.log(e);
            const description =
                e?.response?.data?.description ||
                e?.response?.data?.detail ||
                e?.message ||
                "Błąd dodawania transakcji";
            message.error(description);        }
    }
    return <Card title={"Add transaction"}>
        <Form layout="horizontal" onFinish={onSubmit}>
            <FormItem
                label="Amount"
                name="amount"
                rules={[
                    { required: true, message: 'Kwota jest wymagana' }
                        ]}
            >
                <InputNumber style={{width: "100%"}} placeholder={"kwota"}/>
            </FormItem>
            <FormItem
                label={"Description"}
                name="description"
            >
                <TextArea placeholder={"Put description here..."}/>
            </FormItem>
            <FormItem
                label={"Category"}
                name={"category"}
                rules={[
                    { required: true, message: 'Wybierz kategorie' }
                ]}
            >
                <CategorySelect/>
            </FormItem>
            <Button style={{width: "100%"}} type="primary" htmlType="submit"> Add</Button>
        </Form>
    </Card>
}