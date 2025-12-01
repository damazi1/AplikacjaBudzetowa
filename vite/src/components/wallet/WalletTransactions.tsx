import React, {Fragment, useEffect, useState } from "react";
import {Card, Col, Row, Spin, Empty, Button} from "antd";
import {deleteWalletById, periodWalletTransaction} from "../../services/WalletService";
import dayjs from "dayjs";

type WalletTransactionsProps = {
    walletId: string;
    dateFrom?: string; // "YYYY-MM-DD"
    dateTo?: string;   // "YYYY-MM-DD"
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
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const toggleExpand = (t: string) => {
        const id: string | null = t ?? null;
        console.log(t);
        setExpandedId(prev => (prev === id ? null : id));
    };

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
                console.log(list);
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

    const deleteTransaction = async (transactionId: string) => {
        try {
            console.log(transactionId)
            const response = await deleteWalletById(transactionId)
            console.log("Transakcja usunięta:", response);
            window.location.reload();
        } catch (error) {
            console.error("Błąd usuwania transakcji:", error);
        }
    }
    return (
        <Card title={`Historia transakcji od ${dateFrom ? dayjs(dateFrom).format("DD-MM-YYYY") : "-"} do ${dateTo ? dayjs(dateTo).format("DD-MM-YYYY") : "-"}`}>            {loading ? (
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
                    {transactions.map((t, i) => {
                        const id = t.id ?? String(i);
                        const isExpanded = expandedId === id;
                        const isHovered = hoveredId === id;
                        return (
                            <Fragment key={id}>
                                <Row onClick={() => toggleExpand(id)}
                                     onMouseEnter={() => setHoveredId(id)}
                                     onMouseLeave={() =>
                                        setHoveredId((prev) => (prev === id ? null : prev))}
                                     style={{padding: "4px 0", borderBottom: "1px solid #f0f0f0", cursor: "pointer",
                                         backgroundColor: isExpanded ? "#DCDCDC" : isHovered ? "#D3D3D3" : "transparent"}}>
                                    <Col span={6}>{t.category || "-"}</Col>
                                    <Col span={10} style={{textAlign: "center"}}>{t.description || "-"}</Col>
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
                                    <Col span={4} style={{textAlign: "right"}}>
                                        {t.date ? dayjs(t.date).format("YYYY-MM-DD") : "-"}
                                    </Col>
                                </Row>
                                {isExpanded && (
                                    <Row>
                                        <Col span={12} style={{ display: "flex", justifyContent: "flex-start", padding: "10px"}}>
                                            <Button type={"primary"}  style={{background: "orange", width: "100%"}} >
                                                Edytuj transakcję
                                            </Button>
                                        </Col>
                                        <Col span={12} style={{ display: "flex", justifyContent: "flex-end", padding: "8px 0" }}>
                                                <Button type={"primary"} style={{ width: "100%"}} danger={true} onClick={() => deleteTransaction(id!)}>
                                                    Usuń transakcję
                                                </Button>
                                        </Col>
                                    </Row>
                                )}
                            </Fragment>
                        )

                    })}
                </>
            )}
        </Card>
    );
};