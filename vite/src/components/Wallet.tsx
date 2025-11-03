// `src/components/Wallet.tsx`
import React, { useEffect, useState } from "react";
import { Col, Row, Card, Spin, message } from "antd";
import { useParams } from "react-router-dom";
import { getWalletById } from "../services/WalletService";
import type {Wallet} from "../models/Wallet.ts";
import { CategorySelect } from "./SelectCat.tsx";
import type {Category} from "../models/icons.ts";

const Wallet: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = React.useState<Category | null>(null);

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
          <Col>
              <Card>
                  <h1 style={{ fontWeight: 600, fontSize: 28, marginBottom: 16 }}>Add transaction</h1>

                  <label style={{ display: "block", marginBottom: 8, fontSize: 14, opacity: 0.9 }}>
                      Category
                  </label>
                  <div style={{ maxWidth: 420 }}>
                      <CategorySelect value={category} onChange={setCategory} />
                  </div>
                  {category && (
                      <p style={{ marginTop: 16 }}>
                          Wybrano: <strong>{category.label}</strong>
                      </p>
                  )}
              </Card>
          </Col>
      </Row>
    </div>

  );
};

export default Wallet;