import React from "react";
import {Button, Form, InputNumber} from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import {useParams} from "react-router-dom";
import {newPayment} from "@services/transactionService.tsx";
import {useTranslation} from "react-i18next";

type AccountTransactionFormProps = {
    amount: number;
    description?: string;
}

export function AccountTransactionForm({type}: {type: "deposit" | "withdrawal"}) {
    const {accountId} = useParams<{accountId: string}>();
    const {t} = useTranslation();

    const onSubmit = (values: AccountTransactionFormProps) => {
        if (!accountId) return;

        newPayment({
            ...values,
            accountId
        })
        window.location.reload();
    }


    return (
        <Form onFinish={onSubmit}>
            <FormItem
                name="amount"
                label={t("Amount")}
                rules={[
                    { required: true, message: t("Amount is required") },
                    {
                        validator: (_, value) => {
                            if (type === 'deposit' && value <= 0) {
                                return Promise.reject('Kwota wpłaty musi być dodatnia');
                            }
                            if (type === 'withdrawal' && value >= 0) {
                                return Promise.reject('Kwota wypłaty musi być ujemna');
                            }
                            return Promise.resolve();
                        }
                    }
                ]}
            >
            <InputNumber></InputNumber>
            </FormItem>
            <FormItem
                name="description"
                label={t("Description")}>
                <TextArea/>
            </FormItem>
            <Button type="primary" htmlType="submit">
                {type === 'deposit' ? t("Create deposit") : t("Create withdrawal")}
            </Button>
        </Form>
    )
}
