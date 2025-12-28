import React, {useCallback, useEffect, useState} from "react";
import {fetchWallets} from "@services/WalletService.tsx";
import {Card, Col, Row} from "antd";
import {WalletCard} from "@components/wallet/WalletCard.tsx";
import {useNavigate} from "react-router-dom";
import {WalletCreate} from "@components/wallet/WalletCreate.tsx";
import type {Wallet} from "@models/Wallet.ts";
import {AccountCard} from "@components/account/AccountCard.tsx";
import {AccountCreate} from "@components/account/AccountCreate.tsx";
import {fetchAccounts} from "@services/accountService.tsx";
import type {Accounts} from "@models/Accounts.ts";
import {api} from "../../axios.ts";
import {DateRangePicker} from "@components/common/DataRangePicker.tsx";
import dayjs, {type Dayjs} from "dayjs";
import {HomeCharts} from "@components/home/HomeCharts.tsx";
import {useTranslation} from "react-i18next";

export function HomePage() {
    const navigate = useNavigate();

    const [wallets, setWallets] = React.useState<Wallet[]>([])
    const [, setAccounts] = React.useState<Accounts[]>([])
    const {t} = useTranslation();

    const [balance, setBalance] = useState<number>(0)

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

    const  loadBalance=  async () => {
        try {
            const data = await api.get("/Transaction/all")
            setBalance(data.data)
        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    }
    useEffect(() => {
        loadBalance();
    }, []);

    const [dateRange, setDateRange] = useState<[Dayjs , Dayjs]>([
        dayjs().startOf("month"),
        dayjs().endOf("month"),
    ]);

    return (
        <div>
            <Row>
                <Col span={12} style={{ marginTop: "20px" }}>
                    <h1>{t("Wallets")}</h1>
                </Col>
                <Col span={12} style={{ marginTop: "20px" }}>
                    <WalletCreate
                        onCreated={loadWallets}
                        buttonProps={{ block: true, type: "primary" }}
                        label={t("Create new wallet")}
                    />
                </Col>
                {wallets.length === 0 ? (
                    <Col span={6}>
                        <Card className={"ant-home-card"}>
                            <strong>{t("Wallets not found")}</strong>
                        </Card>
                    </Col>) : (
                    wallets.map((wallet) => (
                        <Col key={wallet.id} span={6}>
                    <WalletCard wallet={wallet} onClick={(w) => navigate(`/wallet/${w.id}`)}/>
                </Col>
                ))
                )}

                <Col span={24} style={{ margin: "20px 0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h1 style={{ margin: 0 }}>{t("Banking accounts")}</h1>
                        <AccountCreate
                            onCreated={loadAccounts}
                            buttonProps={{ type: "primary" }}
                            label={t("Create new bank account")}
                        />
                    </div>
                </Col>
                <Col span={24}>
                    <AccountCard/>
                </Col>
                <Col span={12} style={{ marginTop: "20px" }}>
                    <h1>{t("All accounts overview")}</h1>
                </Col>
                <Col span={12} style={{ marginTop: "20px" , textAlign: "right" }}>
                    <DateRangePicker value={dateRange} onChange={setDateRange}/>
                </Col>
                <Col span={24}>
                    <Card title={t("Overview charts")} style={{ marginTop: "20px" }}>
                        <h1>{t("Balance")}: {balance.toFixed(2)} USD</h1>
                        <HomeCharts
                            dateFrom={dateRange[0].format("YYYY-MM-DD HH:mm:ss")}
                            dateTo={dateRange[1].format("YYYY-MM-DD HH:mm:ss")}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    )
}