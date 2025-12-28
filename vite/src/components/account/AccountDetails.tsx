import React, {useEffect} from 'react';
import {Card, Col, Row, Spin} from "antd";
import {fetchAccountDetails} from "@services/accountService.tsx";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";

type AccountDetailsProps = {
    name: string;
    number: string;
    balance: number;
    currency: string;
    type: string;
}

export function AccountDetails() {
    const [details, setDetails] = React.useState<AccountDetailsProps | null>(null);
    const {accountId} = useParams<{accountId: string}>();
    const {t} = useTranslation();
    const fetchDetails = async () => {
        if (!accountId) return;
        const data = await fetchAccountDetails(accountId);
        setDetails(data);
    }

    useEffect(() => {
        fetchDetails();
    }, []);

    return (
        <Card style={{textAlign: "center"}} title={t("Bank account details")}>
            {details ? (
            <Row>
                <Col span={6}>
                    <strong>{t("Name")}:</strong> {details.name}
                </Col>
                <Col span={6}>
                    <strong>{t("Number")}:</strong> {details.number}
                </Col>
                <Col span={6}>
                    <strong>{t("Balance")}:</strong> {details.balance} {details.currency}
                </Col>
                <Col span={6}>
                    <strong>{t("Type")}:</strong> {details.type}
                </Col>
            </Row>
                ) : (
                    <Col>
                        {t("Account not found")} <br/><Spin/>
                    </Col>
                )}

        </Card>
    )
}