import React, {useCallback, useEffect} from "react";
import type Wallet from "../../components/Wallet.tsx";
import {fetchWallets} from "../../services/WalletService.tsx";
import {Button, Col, Row, Space} from "antd";
import {WalletCard} from "../../components/wallet/WalletCard.tsx";
import {useNavigate} from "react-router-dom";
import {WalletCreate} from "../../components/wallet/WalletCreate.tsx";
import {Icon} from '@iconify/react';

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
                <Col span={24} style={{ marginTop: "20px" }}>
                    <h1>Portfele</h1>
                </Col>
                {wallets.map((wallet) => (
                    <Col key={wallet.id} span={6} style={{padding: "10px"}}>
                        <WalletCard wallet={wallet} onClick={(w) => navigate(`/wallet/${w.id}`)}/>
                    </Col>
                ))}
                <Col span={6} style={{padding: "10px"}}>
                    <Space direction="vertical" style={{ width: "100%" }}>
                        <WalletCreate
                            onCreated={loadWallets}
                            buttonProps={{ block: true, type: "primary" }}
                            label="Utwórz nowy portfel"
                        />
                        <Button block type="primary" onClick={() => navigate("/accounts/new")}>
                            Utwórz nowe konto
                        </Button>
                    </Space>
                </Col>
            </Row>
            <Icon icon={"mdi:car"} width={48} height={48} color={"#555555"}/>
        </div>
    )
}