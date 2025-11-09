// `src/components/Wallet.tsx`
import React, { useEffect, useState } from "react";
import {Col, Row, Card, message, Form, InputNumber, Input} from "antd";
import { useParams } from "react-router-dom";
import { getWalletById } from "../services/WalletService";
import type {Wallet} from "../models/Wallet.ts";
import { CategorySelect } from "./SelectCat.tsx";
import {WalletDetails} from "./wallet/WalletDetails.tsx";
import FormItem from "antd/es/form/FormItem";

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
        <Col span={6}>
            <WalletDetails/>
        </Col>
          <Col span={8}>
              <Card>
                  <h1 style={{ fontWeight: 600, fontSize: 28, marginBottom: 16 }}>Add transaction</h1>
                  <Form layout="horizontal" onFinish={setLoading}>
                      <FormItem
                              label="Amount"
                              >
                          <InputNumber style={{width: "100%"}} placeholder={"kwota"}/>
                      </FormItem>
                      <FormItem
                          label={"Description (optional)"}
                          >
                      <Input placeholder={"Put description here..."}/>
                      </FormItem>
                      <FormItem
                          label={"Category"}>
                      <CategorySelect/>
                      </FormItem>
                  </Form>
              </Card>
          </Col>
      </Row>
    </div>

  );
};

export default Wallet;