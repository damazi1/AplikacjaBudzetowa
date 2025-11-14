import React, {useCallback, useEffect} from "react";
import {fetchWallets} from "@services/WalletService.tsx";
import {Col, DatePicker, Row} from "antd";
import {WalletCard} from "@components/wallet/WalletCard.tsx";
import {useNavigate} from "react-router-dom";
import {WalletCreate} from "@components/wallet/WalletCreate.tsx";
import type {Wallet} from "@models/Wallet.ts";
import {AccountCard} from "@components/account/AccountCard.tsx";
import {AccountCreate} from "@components/account/AccountCreate.tsx";
import {fetchAccounts} from "@services/accountService.tsx";
import type {Accounts} from "@models/Accounts.ts";

export function HomePage() {
    const navigate = useNavigate();

    const [wallets, setWallets] = React.useState<Wallet[]>([])
    const [accounts, setAccounts] = React.useState<Accounts[]>([])
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

    const loadAccounts = useCallback(() => {
        fetchAccounts()
            .then((data) => {
                setAccounts(data)
            })
            .catch(()=> {
                setAccounts([])
            })
    },[]);
    useEffect(() => {
        loadAccounts();
    }, []);

    return (
        <div>
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
                <Col span={24} style={{ margin: "20px 0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h1 style={{ margin: 0 }}>Konta Bankowe</h1>
                        <AccountCreate
                            onCreated={loadAccounts}
                            buttonProps={{ type: "primary" }}
                            label="Utwórz nowe konto bankowe"
                        />
                    </div>
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