import React from "react";
import {Button, Form, Input, InputNumber} from "antd";
import FormItem from "antd/es/form/FormItem";
import TextArea from "antd/es/input/TextArea";
import {newTransfer} from "@services/transactionService.tsx";
import {useParams} from "react-router-dom";

type AccountTransferFormProps = {
    accountToId: string;
    amount: number;
    description?: string;
}

export function AccountTransferForm() {
    const {accountId} = useParams<{accountId: string}>();

    const onSubmit = (values: AccountTransferFormProps) => {
        if (!accountId) return;
        newTransfer({
            ...values,
            accountId: accountId,
        })
    }
    return (
        <Form onFinish={onSubmit}>
            <FormItem
                name={"accountToId"}
                label={"Numer konta odbiorcy"}>

                <Input></Input>

            </FormItem>
            <FormItem
                name={"amount"}
                label={"Kwota"}>

                <InputNumber></InputNumber>
            </FormItem>
            <FormItem
                name={"description"}
                label={"Opis (opcjonalny)"}>
                <TextArea></TextArea>
            </FormItem>
            <Button type="primary" htmlType="submit">Utwórz przelew</Button>
        </Form>
    )
}