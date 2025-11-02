// `src/components/Wallet.tsx`
import React, { useEffect, useState } from "react";
import { Col, Row, Card, Spin, message } from "antd";
import { useParams } from "react-router-dom";
import { getWalletById } from "../services/WalletService";
import type {Wallet} from "../models/Wallet.ts";

const Wallet: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      console.log(id);
      if (!id) return;
    const load = async () => {
      setLoading(true);
      try {
        const data = await getWalletById(id);
        setWallet(data);
      } catch (e: any) {
        message.error(e?.message || "Błąd pobierania portfela");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  return (
    <div style={{ margin: "15px" }}>
      <h1>Wallet</h1>
      <Row>
        <Col>
          {loading ? (
            <Spin />
          ) : wallet ? (
            <Card>
              <p><strong>Id:</strong> {wallet.id}</p>
              <p><strong>Nazwa:</strong> {wallet.name}</p>
              <p><strong>Użytkownik:</strong> {wallet.userId}</p>
              <p><strong>Waluta:</strong> {wallet.currency}</p>
              <p><strong>Saldo:</strong> {wallet.balance}</p>
            </Card>
          ) : (
            <div>Brak danych</div>
          )}
        </Col>
      </Row>
        <h5>This is a user icon</h5>
        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
        </svg>    </div>
  );
};

export default Wallet;