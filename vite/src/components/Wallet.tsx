// `src/components/Wallet.tsx`
import React, { useEffect, useState } from "react";
import {Col, Row, Card, message, Form, InputNumber, Input, Button, DatePicker} from "antd";
import { useParams } from "react-router-dom";
import {getWalletById, newWalletTransaction} from "../services/WalletService";
import type {Wallet} from "../models/Wallet.ts";
import { CategorySelect } from "./SelectCat.tsx";
import {WalletDetails} from "./wallet/WalletDetails.tsx";
import FormItem from "antd/es/form/FormItem";
import {WalletTransactions} from "./wallet/WalletTransactions.tsx";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

type WalletTransactionsProps = {
    walletId: string;
    dateFrom?: string; // "YYYY-MM-DD"
    dateTo?: string;   // "YYYY-MM-DD"
};

const Wallet: React.FC = () => {
    const { id } = useParams<{ id?: string }>();
    const [setWallet] = useState<Wallet | null>(null);
    const [setLoading] = useState(false);
    const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
        dayjs().startOf("month"),
        dayjs().endOf("month"),
    ]);
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

    const onSubmit = async (values: { amount: number; description?: string; category: string }) => {
        if (!id) {return}
        try {
            await newWalletTransaction(values ,id)
            window.location.reload();
        } catch (e: any) {
            message.error(e?.message || "Błąd dodawania transakcji");
        }
    }

    return (
        <div style={{ width: "60%", margin: "auto" }}>
            <Row>
                <Col span={12} style={{padding: "10px"}}>
                    <h1>Wallet</h1>
                </Col>
                <Col span={12} style={{textAlign: "right", padding: "10px"}} >
                    <DatePicker.RangePicker
                        format="DD-MM-YYYY"
                        placeholder={['Start Date', 'End Date']}
                        defaultValue={[dayjs().startOf('month'), dayjs().endOf('month')]}
                        onChange={(dates) => {
                            if (!dates) {
                                setDateRange([dayjs().startOf('month'), dayjs().endOf('month')]);
                            } else {
                                // początek dnia 00:00:00, koniec dnia 23:59:59.999
                                setDateRange([dates[0]!.startOf('day'), dates[1]!.endOf('day')]);
                                console.log(dates);
                            }
                        }}
                        allowClear={true}
                        inputReadOnly={false}
                        />
                </Col>
                <Col span={24}>
                    <WalletDetails/>
                </Col>
                <Col span={6}>
                    <Card style={{height: "80%"}}>
                        <h4>Current wallet balance:</h4>
                        <p style={{color: "green", fontSize: 24, fontWeight: 600}}>+1000.00 PLN</p>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card style={{height: "80%"}}>
                        <h4>Period balance change:</h4>
                        <p style={{color: "red", fontSize: 24, fontWeight: 600}}>-100.00 PLN</p>
                    </Card>
                </Col>
                <Col span={6} >
                    <Card style={{height: "80%"}}>
                        <h4>Period Expenses:</h4>
                        <p style={{color: "red", fontSize: 24, fontWeight: 600}}>-100.00 PLN</p>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card style={{height: "80%"}}>
                        <h4>Period Income:</h4>
                        <p style={{color: "green", fontSize: 24, fontWeight: 600}}>0.00 PLN</p>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card>
                        <h1 style={{ fontWeight: 600, fontSize: 28, marginBottom: 16 }}>Add transaction</h1>
                        <Form layout="horizontal" onFinish={onSubmit}>
                            <FormItem
                                label="Amount"
                                name="amount"
                            >
                                <InputNumber style={{width: "100%"}} placeholder={"kwota"}/>
                            </FormItem>
                            <FormItem
                                label={"Description (optional)"}
                                name="description"
                            >
                                <Input placeholder={"Put description here..."}/>
                            </FormItem>
                            <FormItem
                                label={"Category"}
                                name={"category"}
                            >
                                <CategorySelect/>
                            </FormItem>
                            <Button style={{width: "100%"}} type="primary" htmlType="submit"> Add</Button>
                        </Form>
                    </Card>
                </Col>
                <Col span={16}>
                    <WalletTransactions
                        walletId={id!}
                        dateFrom={dateRange[0].format("YYYY-MM-DD HH:mm:ss")}
                        dateTo={dateRange[1].format("YYYY-MM-DD HH:mm:ss")}
                    />
                </Col>
            </Row>
        </div>

    );
};

export default Wallet;