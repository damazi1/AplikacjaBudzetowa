import React, {useCallback, useEffect} from "react";
import {fetchWallets} from "@services/WalletService.tsx";
import {Button, Col, DatePicker, Row, Space} from "antd";
import {WalletCard} from "@components/wallet/WalletCard.tsx";
import {useNavigate} from "react-router-dom";
import {WalletCreate} from "@components/wallet/WalletCreate.tsx";
import type {Wallet} from "@models/Wallet.ts";
import {AccountCard} from "@components/account/AccountCard.tsx";

export function HomePage() {
    const navigate = useNavigate();

    const [wallets, setWallets] = React.useState<Wallet[]>([])

    const loadWallets = useCallback(() => {
        fetchWallets()
            .then((data) => {
                setWallets(data)
            })
            .catch(() => {
                setWallets([])
            })
    },[]);

    useEffect(() => {
        loadWallets();
    }, [loadWallets]);

    return (
        <div style={{ width: "60%", margin: "auto" }}>
            <Row>
                <Col span={12} style={{ marginTop: "20px" }}>
                    <h1>Portfele</h1>
                </Col>
                <Col span={12} style={{ marginTop: "20px" }}>
                    <WalletCreate
                        onCreated={loadWallets}
                        buttonProps={{ block: true, type: "primary" }}
                        label="Utwórz nowy portfel"
                    />
                </Col>
                {wallets.map((wallet) => (
                    <Col key={wallet.id} span={6} style={{padding: "10px"}}>
                        <WalletCard wallet={wallet} onClick={(w) => navigate(`/wallet/${w.id}`)}/>
                    </Col>
                ))}
                <Col span={12} style={{ marginTop: "20px" }}>
                    <h1>Konta Bankowe</h1>
                </Col>
                <Col span={12} style={{ marginTop: "20px" }}>
                    <Button block type="primary" onClick={() => navigate("/accounts/new")}>
                        Utwórz nowe konto bankowe
                    </Button>
                </Col>
                <Col span={24}>
                    <AccountCard/>
                </Col>
                <Col span={12} style={{ marginTop: "20px" }}>
                    <h1>Podsumowanie finansowe i inne funkcje w budowie...</h1>
                </Col>
                <Col span={12} style={{ marginTop: "20px" }}>
                    <DatePicker.RangePicker
                        style={{ width: "100%" }}
                    >
                    </DatePicker.RangePicker>
                </Col>
                
            </Row>
        </div>
    )
}