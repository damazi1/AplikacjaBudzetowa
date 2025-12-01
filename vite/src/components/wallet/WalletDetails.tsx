import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import React from "react";
import {getWalletById} from "../../services/WalletService.tsx";
import type { Wallet } from "../../models/Wallet.ts";
import {Card, Col, Row, Spin} from "antd";


export const WalletDetails =() => {
    const {id} = useParams<{id: string}>();
    const [wallet, setWallet] = useState<Wallet | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!id) return;
        const loadData = async () => {
            setLoading(true);
            try{
                const data = await getWalletById(id);
                setWallet(data);
            } catch (error) {
                console.error("Error fetching wallet:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id]);
    return (
        <div style={{ padding: '20px 0' }}>
        {
            loading ? ( <Spin/>) : wallet ? (
                <Card style={{textAlign: "center"}} title={"Dane o portfelu"}>
                    <Row style={{textAlign: "center"}}>
                        <Col span={12}>
                            <strong>Nazwa portfela:</strong> {wallet.name}
                        </Col>
                        <Col span={12}>
                            <strong>Waluta:</strong> {wallet.currency}
                        </Col>
                    </Row>
                </Card>
) : (<div>Brak danych</div>)
}
        </div>
);
}