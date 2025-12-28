import React, {Fragment, useEffect, useState } from "react";
import {Card, Col, Row, Spin, Empty, Button, Modal} from "antd";
import {deleteWalletById, periodWalletTransaction} from "../../services/WalletService";
import dayjs from "dayjs";
import {WalletUpdateTransaction} from "@components/wallet/WalletUpdateTransaction.tsx";
import {useTranslation} from "react-i18next";

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

    const [modalOpen, setModalOpen] = useState(false);
    const [modalInitials, setModalInitials] = useState<{id?: string; amount?: number; description?: string; category?: string }>({});

    const {t} = useTranslation();

    const toggleExpand = (t: string) => {
        const id: string | null = t ?? null;
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
            await deleteWalletById(transactionId);
            window.location.reload();
        } catch (error) {
            console.error("Błąd usuwania transakcji:", error);
        }
    }

    const openUpdateModalPrefilled = (t?: TransactionItem) => {
        setModalInitials({
            id: t?.id,
            amount: t?.amount,
            description: t?.description,
            category: t?.category,
        });
        setModalOpen(true);
    };

    return (
        <Card title={`${t("Transaction history from")}  ${dateFrom ? dayjs(dateFrom).format("DD-MM-YYYY") : "-"} ${t("to")} ${dateTo ? dayjs(dateTo).format("DD-MM-YYYY") : "-"}`}>            {loading ? (
                <div style={{ textAlign: "center", padding: 16 }}>
                    <Spin />
                </div>
            ) : error ? (
                <div style={{ color: "red" }}>{error}</div>
            ) : transactions.length === 0 ? (
                <Empty description={t("No transaction")} />
            ) : (
                <>
                    <Row style={{ fontWeight: 600, marginBottom: 8 }}>
                        <Col span={6}>{t("Category")}</Col>
                        <Col span={10} style={{ textAlign: "center" }}>{t("Description")}</Col>
                        <Col span={4} style={{ textAlign: "right" }}>{t("Amount")}</Col>
                        <Col span={4} style={{ textAlign: "right" }}>{t("Date")}</Col>
                    </Row>
                    {transactions.map((tx, i) => {
                        const id = tx.id ?? String(i);
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
                                    <Col span={6}>{tx.category || "-"}</Col>
                                    <Col span={10} style={{textAlign: "center"}}>{tx.description || "-"}</Col>
                                    <Col
                                        span={4}
                                        style={{
                                            textAlign: "right",
                                            color: (tx.amount ?? 0) < 0 ? "red" : "green",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {tx.amount != null ? (tx.amount < 0 ? "-" : "+") + Math.abs(tx.amount).toFixed(2) + " PLN" : "-"}
                                    </Col>
                                    <Col span={4} style={{textAlign: "right"}}>
                                        {tx.date ? dayjs(tx.date).format("YYYY-MM-DD") : "-"}
                                    </Col>
                                </Row>
                                {isExpanded && (
                                    <Row>
                                        <Col span={12} style={{ display: "flex", justifyContent: "flex-start", padding: "10px"}}>
                                            <Button type={"primary"}  style={{background: "orange", width: "100%"}} onClick={() =>
                                                openUpdateModalPrefilled(tx)}>
                                                {t("Edit transaction")}
                                            </Button>
                                        </Col>
                                        <Col span={12} style={{ display: "flex", justifyContent: "flex-end", padding: "8px 0" }}>
                                                <Button type={"primary"} style={{ width: "100%"}} danger={true} onClick={() => deleteTransaction(id!)}>
                                                    {t("Delete transaction")}
                                                </Button>
                                        </Col>
                                    </Row>
                                )}
                            </Fragment>
                        )

                    })}
                    <Modal
                        title="Dodaj transakcję"
                        open={modalOpen}
                        onCancel={() => setModalOpen(false)}
                        footer={null}
                        destroyOnClose
                    >
                        <WalletUpdateTransaction
                            walletId={walletId}
                            initialValues={modalInitials}
                            onSuccess={() => {
                                setModalOpen(false);
                                // Odświeżenie listy transakcji po dodaniu/edycji
                                setLoading(true);
                            }}
                        />
                    </Modal>
                </>
            )}
        </Card>
    );
};