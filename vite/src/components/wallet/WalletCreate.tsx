import React from "react";
import { Button, Modal, Form, Input, Select, InputNumber, message } from "antd";
import type { ButtonProps } from "antd";
import { addWallet } from "@services/WalletService.tsx";
import { currencies } from "@services/CurrencyService.tsx";
import {useTranslation} from "react-i18next";

type Props = {
    onCreated?: () => void;              // wywołaj po sukcesie, np. do refetch portfeli
    label?: string;                      // tekst na przycisku
    buttonProps?: ButtonProps;           // np. { block: true, type: 'primary' }
};

type FormValues = {
    name: string;
    currency: string;
    balance?: number;
};

export function WalletCreate({ onCreated, label = "Utwórz nowy portfel", buttonProps }: Props) {
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
            await addWallet({
                name: values.name,
                currency: values.currency,
                balance: Number(values.balance ?? 0),
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
            >
                {label}
            </Button>

            <Modal
                title={t("Create new wallet")}
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
                        <Input placeholder={t("e.g. Daily wallet")} />
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

                    <Form.Item
                        name="balance"
                        label={t("Initial balance")}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            min={0}
                            step={0.01}
                            stringMode
                            precision={2}
                            defaultValue={0}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}