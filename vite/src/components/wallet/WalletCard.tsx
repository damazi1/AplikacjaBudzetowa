import React from 'react';
import {Card, Col, Row} from "antd";
import type { Wallet } from "@models/Wallet.ts";
import {Icon} from "@iconify/react";
import "@styles/Home.css";
import {useTranslation} from "react-i18next";


interface WalletCardProps {
    wallet: Wallet;
    onClick?: (wallet: Wallet) => void;
}

export function WalletCard({wallet, onClick}: WalletCardProps){
    const {t} = useTranslation();

    return (
        <Card
            className="ant-home-card"
            hoverable
            onClick={() => onClick?.(wallet)}
            style={{cursor:'pointer'}}
            >
            <Row>
                <Col
                    span={4}
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    <Icon icon={"mdi:wallet-bifold"} width={50} height={50} color={"brown"}/>
                </Col>
                <Col span={20}>
                    <h3><strong>{t("Name")}:</strong> {wallet.name}</h3>
                    <strong> {t("Balance")}:</strong> <span className={"PositiveTransaction"}>{wallet.balance.toFixed(2)} {wallet.currency}</span>
                </Col>
            </Row>
        </Card>
    );
}