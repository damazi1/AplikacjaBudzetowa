import React from 'react';
import {Card} from "antd";
import type Wallet from "../Wallet.tsx";

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
            <p> Nazwa: {wallet.name}</p>
            <p> Balans: {wallet.balance} {wallet.currency}</p>
        </Card>
    );
}