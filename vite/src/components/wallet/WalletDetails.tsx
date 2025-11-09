import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import React from "react";
import {getWalletById} from "../../services/WalletService.tsx";
import type Wallet from "../Wallet.tsx";
import {Spin} from "antd";


export const WalletDetails =() => {
    const {id} = useParams<{id: string}>();
    const [wallet, setWallet] = useState<Wallet | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        console.log("Wallet ID:", id);
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
        <div style={{ padding: '20px' }}>
        {
            loading ? ( <Spin/>) : wallet ? (
                <>
                    <p><strong>Id:</strong> {wallet.id}</p>
                    <p><strong>Nazwa:</strong> {wallet.name}</p>
                    <p><strong>Użytkownik:</strong> {wallet.userId}</p>
                    <p><strong>Waluta:</strong> {wallet.currency}</p>
                    <p><strong>Saldo:</strong> {wallet.balance}</p>
                </>
) : (<div>Brak danych</div>)
}
        </div>
);
}