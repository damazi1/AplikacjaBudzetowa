import React from "react";
import {Button, Form, Input, InputNumber} from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import {newTransfer} from "@services/transactionService.tsx";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

type AccountTransferFormProps = {
    accountToNumber: string;
    amount: number;
    description?: string;
}

export function AccountTransferForm() {
    const {accountId} = useParams<{accountId: string}>();
    const {t} = useTranslation();
    const onSubmit = (values: AccountTransferFormProps) => {
        if (!accountId) return;
        newTransfer({
            ...values,
            accountFromId: accountId,
        })
    }
    return (
        <Form onFinish={onSubmit}>
            <FormItem
                name={"accountToNumber"}
                label={t("Recipient account number")}
                rules={[{required: true, message: t("Please input account number")}]}>

                <Input></Input>

            </FormItem>
            <FormItem
                name={"amount"}
                label={t("Amount")}
                rules={[{required: true, message: t("Please input amount")}]}>

                <InputNumber></InputNumber>
            </FormItem>
            <FormItem
                name={"description"}
                label={t("Description")}>
                <TextArea></TextArea>
            </FormItem>
            <Button type="primary" htmlType="submit">{t("Create transfer")}</Button>
        </Form>
    )
}