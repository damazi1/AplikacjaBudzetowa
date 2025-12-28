import React, {useEffect, useState} from "react";
import {Card, Col, Row} from "antd";
import type {Accounts} from "@models/Accounts.ts";
import {fetchAccounts} from "@services/accountService.tsx";
import {useNavigate} from "react-router-dom";
import {Icon} from "@iconify/react";
import "@styles/Home.css";
import {useTranslation} from "react-i18next";

export function AccountCard(){
    const [AccountData, setAccounts] = useState<Accounts [] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const {t} = useTranslation();
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
                    <strong>{t("Loading")}</strong>
                </Card>
            ) : AccountData && AccountData.length > 0 ? (
                AccountData.map(account => (
                    <Col span={6} key={account.id} >
                        <Card
                            className="ant-home-card" variant="outlined"
                            onClick={() => navigate(`/account/${account.id}`)}
                            style={{cursor: 'pointer'}}>
                            <Row>
                                <Col span={4}
                                     style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <Icon icon={"mdi:bank"} width={50} height={50} color={"blue"}/>
                                </Col>
                                <Col span={20}>
                                    <h3><strong>{t("Name")}:</strong> {account.name}</h3>
                                    <strong>{t("Balance")}:</strong> <span className={"PositiveTransaction"}> {account.balance.toFixed(2)} {account.currency}</span><br/>
                                    <strong>{t("Type")}:</strong> {account.type}
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                ))
            ) : (
                <Col span={6}>
                    <Card className="ant-home-card" variant="outlined">
                        <strong>Nie znaleziono kont</strong>
                    </Card>
                </Col>
            )}
        </Row>
    </div>
}