import React from 'react';
import {Card, Col, Row} from "antd";
import type { Wallet } from "../../models/Wallet.ts";
import {Icon} from "@iconify/react";

interface WalletCardProps {
    wallet: Wallet;
    onClick?: (wallet: Wallet) => void;
}

export function WalletCard({wallet, onClick}: WalletCardProps){
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
                    <p><h3><strong>Nazwa:</strong> {wallet.name}</h3> </p>
                    <p> <strong> Balans:</strong> <div className={"PositiveTransaction"}>{wallet.balance.toFixed(2)} {wallet.currency}</div></p>
                </Col>
            </Row>
        </Card>
    );
}