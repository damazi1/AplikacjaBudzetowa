import React, {useEffect} from 'react';
import {Card, Col, Row, Spin} from "antd";
import {fetchAccountDetails} from "@services/accountService.tsx";
import {useParams} from "react-router-dom";

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

    const fetchDetails = async () => {
        if (!accountId) return;
        const data = await fetchAccountDetails(accountId);
        console.log(data);
        setDetails(data);
    }

    useEffect(() => {
        fetchDetails();
    }, []);

    return (
        <Card style={{textAlign: "center"}} title="Detale konta bankowego">
            {details ? (
            <Row>
                <Col span={6}>
                    <strong>Nazwa:</strong> {details.name}
                </Col>
                <Col span={6}>
                    <strong>Numer:</strong> {details.number}
                </Col>
                <Col span={6}>
                    <strong>Balans: </strong> {details.balance} {details.currency}
                </Col>
                <Col span={6}>
                    <strong>Typ: </strong> {details.type}
                </Col>
            </Row>
                ) : (
                    <Col>
                        Ładowanie szczegółów konta / Nie odnaleziono konta <br/><Spin/>
                    </Col>
                )}

        </Card>
    )
}