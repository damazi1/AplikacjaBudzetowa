import {Button, type ButtonProps, Form, Input, message, Modal, Select} from "antd";
import React from "react";
import {currencies} from "@services/CurrencyService.tsx";
import {createAccount} from "@services/accountService.tsx";
import {useTranslation} from "react-i18next";

type Props = {
    onCreated?: () => void;              // wywołaj po sukcesie, np. do refetch portfeli
    label?: string;                      // tekst na przycisku
    buttonProps?: ButtonProps;           // np. { block: true, type: 'primary' }
};
type FormValues = {
    name: string;
    currency: string;
    accountType?: string;
};

export function AccountCreate({ onCreated, label = "Utwórz nowy portfel", buttonProps }: Props) {
    const [open, setOpen] = React.useState(false);
    const [saving, setSaving] = React.useState(false);
    const [options, setOptions] = React.useState<{ value: string; label: string }[]>([]);
    const [loadingCurrencies, setLoadingCurrencies] = React.useState(false);
    const [form] = Form.useForm<FormValues>();
    const {t} = useTranslation();
    // pobierz waluty tylko gdy modal otwarty
    React.useEffect(() => {
        if (!open) return;
        let active = true;
        setLoadingCurrencies(true);
        currencies()
            .then((data) => active && setOptions(data ?? []))
            .catch(() => active && setOptions([]))
            .finally(() => active && setLoadingCurrencies(false));
        return () => {
            active = false;
        };
    }, [open]);

    const handleSubmit = async (values: FormValues) => {
        try {
            setSaving(true);
            console.log(values);
            await createAccount({
                name: values.name,
                currency: values.currency,
                type: "LOAN",
            });
            message.success("Portfel utworzony");
            setOpen(false);
            form.resetFields();
            onCreated?.(); // odśwież listę
        } catch (e: any) {
            message.error(e?.message ?? "Błąd zapisu");
        } finally {
            setSaving(false);
        }
    };
    return (
        <>
            <Button
                type="primary"
                {...buttonProps}
                onClick={() => setOpen(true)}
                style={{ width: "50%" }}
            >
                {label}
            </Button>

            <Modal
                title={t("Create new bank account")}
                open={open}
                onCancel={() => {
                    setOpen(false);
                    form.resetFields();
                }}
                onOk={() => form.submit()}
                okText={t("Create")}
                cancelText={t("Cancel")}
                confirmLoading={saving}
                destroyOnHidden={true}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit} preserve={false}>
                    <Form.Item
                        name="name"
                        label={t("Name")}
                        rules={[{ required: true, message: t("Enter a name") }]}
                    >
                        <Input placeholder={t("e.g. Saving account")} />
                    </Form.Item>

                    <Form.Item
                        name="currency"
                        label={t("Currency")}
                        rules={[{ required: true, message: t("Choose currency") }]}
                    >
                        <Select
                            loading={loadingCurrencies}
                            placeholder={t("Choose currency")}
                            options={options}
                        />
                    </Form.Item>
                    {/*
                    TODO: Dodać inne typy kont
                    */}
                    <Form.Item
                        name="accountType"
                        label={t("Account type")}
                        rules={[{ required: true, message: t("Choose account type") }]}
                        initialValue="LOAN"
                    >
                        <Select
                            placeholder={t("Choose account type")}
                            options={[
                                { value: "LOAN", label: t("Loan") },
                                { value: "SAVINGS", label: t("Savings") },
                                { value: "CHECKING", label: t("Checking") },
                            ]}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}