import {Button, type ButtonProps, Form, Input, message, Modal, Select} from "antd";
import React from "react";
import {currencies} from "@services/CurrencyService.tsx";
import {createAccount} from "@services/accountService.tsx";

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
                title="Nowe konto bankowe"
                open={open}
                onCancel={() => {
                    setOpen(false);
                    form.resetFields();
                }}
                onOk={() => form.submit()}
                okText="Zapisz"
                cancelText="Anuluj"
                confirmLoading={saving}
                destroyOnHidden={true}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit} preserve={false}>
                    <Form.Item
                        name="name"
                        label="Nazwa"
                        rules={[{ required: true, message: "Podaj nazwę" }]}
                    >
                        <Input placeholder="np. Mój portfel" />
                    </Form.Item>

                    <Form.Item
                        name="currency"
                        label="Waluta"
                        rules={[{ required: true, message: "Wybierz walutę" }]}
                    >
                        <Select
                            loading={loadingCurrencies}
                            placeholder="Wybierz walutę"
                            options={options}
                        />
                    </Form.Item>
                    <Form.Item
                        name="accountType"
                        label="Typ konta"
                        rules={[{ required: true, message: "Wybierz typ konta" }]}
                        initialValue="LOAN"
                    >
                        <Select
                            placeholder="Wybierz typ konta"
                            options={[
                                { value: "LOAN", label: "Kredytowe" },
                                { value: "SAVINGS", label: "Oszczędnościowe" },
                                { value: "CHECKING", label: "Rozliczeniowe" },
                            ]}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}