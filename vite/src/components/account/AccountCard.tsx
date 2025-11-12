import React, {useEffect, useState} from "react";
import {Card, Col, Row} from "antd";
import type {Accounts} from "@models/Accounts.ts";
import {fetchAccounts} from "@services/accountService.ts";
import {useNavigate} from "react-router-dom";


export function AccountCard(){
    const [AccountData, setAccounts] = useState<Accounts [] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccountData = async () => {
            try {
                const accounts = await fetchAccounts();
                setAccounts(accounts);
            } catch (err: any) {
            } finally {
                setIsLoading(false);
            }
        };
        fetchAccountData();
    }, [] );

    return <div>
        <Row>
            {isLoading ? (
                <Card className="ant-home-card" variant="outlined">
                    <strong>Ładowanie kont...</strong>
                </Card>
            ) : AccountData && AccountData.length > 0 ? (
                AccountData.map(account => (
                    <Col span={6}>
                        <Card
                            key={account.number} className="ant-home-card" variant="outlined"
                            onClick={() => navigate(`/account/${account.number}`)}
                            style={{cursor: 'pointer'}}>
                            <p><strong>name:</strong> {account.name}</p>
                            <p><strong>balance:</strong> {account.balance} {account.currency}</p>
                            <p><strong>Type:</strong> {account.type}</p>
                        </Card>
                    </Col>
                ))
            ) : (
                <Card className="ant-home-card" variant="outlined">
                    <strong>Nie znaleziono kont</strong>
                </Card>
            )}
        </Row>
    </div>
}