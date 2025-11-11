import React, { useEffect, useState } from "react";
import { Card, Col, Row, Spin, Empty } from "antd";
import { periodWalletTransaction } from "../../services/WalletService";
import dayjs from "dayjs";
import type {Dayjs} from "dayjs";

type WalletTransactionsProps = {
    walletId: string;
    dateFrom?: Dayjs; // "YYYY-MM-DD"
    dateTo?: Dayjs;   // "YYYY-MM-DD"
};

type TransactionItem = {
    id?: string;
    date?: string;
    category?: string;
    description?: string;
    amount?: number;
};

export const WalletTransactions: React.FC<WalletTransactionsProps> = ({
                                                                          walletId,
                                                                          dateFrom,
                                                                          dateTo,
                                                                      }) => {
    const [loading, setLoading] = useState(false);
    const [transactions, setTransactions] = useState<TransactionItem[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!walletId || !dateFrom || !dateTo) {
                setTransactions([]);
                return;
            }
            setLoading(true);
            setError(null);
            try {
                const data = await periodWalletTransaction({
                    walletId,
                    startDate: dateFrom,
                    endDate: dateTo,
                });
                const list: TransactionItem[] = Array.isArray(data) ? data : [];
                list.sort((a, b) => {
                    const tb = b?.date ? dayjs(b.date).valueOf() : 0;
                    const ta = a?.date ? dayjs(a.date).valueOf() : 0;
                    return tb - ta; // najnowsze u góry
                });
                setTransactions(list);
            } catch (e: any) {
                setError(e?.message || "Błąd pobierania transakcji");
                setTransactions([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [walletId, dateFrom, dateTo]);

    return (
        <Card>
            <h4>Zakres: {dateFrom ?? "-"} → {dateTo ?? "-"}</h4>
            {loading ? (
                <div style={{ textAlign: "center", padding: 16 }}>
                    <Spin />
                </div>
            ) : error ? (
                <div style={{ color: "red" }}>{error}</div>
            ) : transactions.length === 0 ? (
                <Empty description="Brak transakcji" />
            ) : (
                <>
                    <Row style={{ fontWeight: 600, marginBottom: 8 }}>
                        <Col span={6}>Kategoria</Col>
                        <Col span={10} style={{ textAlign: "center" }}>Opis</Col>
                        <Col span={4} style={{ textAlign: "right" }}>Kwota</Col>
                        <Col span={4} style={{ textAlign: "right" }}>Data</Col>
                    </Row>
                    {transactions.map((t, i) => (
                        <Row key={t.id ?? i} style={{ padding: "4px 0", borderBottom: "1px solid #f0f0f0" }}>
                            <Col span={6}>{t.category || "-"}</Col>
                            <Col span={10} style={{ textAlign: "center" }}>{t.description || "-"}</Col>
                            <Col
                                span={4}
                                style={{
                                    textAlign: "right",
                                    color: (t.amount ?? 0) < 0 ? "red" : "green",
                                    fontWeight: 500,
                                }}
                            >
                                {t.amount != null ? (t.amount < 0 ? "-" : "+") + Math.abs(t.amount).toFixed(2) + " PLN" : "-"}
                            </Col>
                            <Col span={4} style={{ textAlign: "right" }}>
                                {t.date ? dayjs(t.date).format("YYYY-MM-DD") : "-"}
                            </Col>
                        </Row>
                    ))}
                </>
            )}
        </Card>
    );
};