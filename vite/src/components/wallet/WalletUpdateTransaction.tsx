// src/components/wallet/WalletUpdateTransaction.tsx
import React from "react";
import {updateWalletTransaction} from "@services/WalletService.tsx";
import { Button, Card, Form, InputNumber, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import { CategorySelect } from "@components/wallet/WalletCategorySelect.tsx";

interface WalletUpdateTransactionProps {
    walletId: string;
    initialValues?: {id?: string; amount?: number; description?: string; category?: string };
    onSuccess?: () => void;
}

export function WalletUpdateTransaction({ walletId, initialValues, onSuccess }: WalletUpdateTransactionProps) {
    const [form] = Form.useForm();

    const onSubmit = async (values: {id: string; amount: number; description?: string; category: string }) => {
        if (!walletId) return;
        try {
            values.id = initialValues!.id as string;
            console.log(values)
            await updateWalletTransaction(values);
            onSuccess?.();
            window.location.reload();
        } catch (e: any) {
            message.error(e?.message || "Błąd dodawania transakcji");
        }
    };

    return (
        <Card title={"Edytuj transakcję"}>
            <Form
                form={form}
                layout="horizontal"
                onFinish={onSubmit}
                initialValues={initialValues}
            >
                <FormItem
                    label="Amount"
                    name="amount"
                    rules={[{ required: true, message: "Kwota jest wymagana" }]}
                >
                    <InputNumber style={{ width: "100%" }} placeholder={"kwota"} />
                </FormItem>
                <FormItem label={"Description"} name="description">
                    <TextArea placeholder={"Put description here..."} />
                </FormItem>
                <FormItem
                    label={"Category"}
                    name={"category"}
                    rules={[{ required: true, message: "Wybierz kategorie" }]}
                >
                    <CategorySelect />
                </FormItem>
                <Button style={{ width: "100%" }} type="primary" htmlType="submit">
                    Zapisz
                </Button>
            </Form>
        </Card>
    );
}