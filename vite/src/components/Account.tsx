import React, {useEffect} from "react";
import { message, Layout, Card, Row, Col, Segmented } from "antd";
import {fetchAccountDetails} from "../services/accountService.ts";
import { useParams } from "react-router-dom";
import type {Accounts} from "../models/Accounts.ts";
import {fetchTransactions} from "../services/transactionService.ts";
import type {Transaction} from "../models/Transactions.ts";
const { Content } = Layout;
import {LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer} from "recharts";

const Account: React.FC = () => {
    const [accountData, setAccountData] = React.useState<Accounts | null>(null); // Typowanie można dostosować do modelu konta
    const [transactionData, setTransactionData] = React.useState<Transaction[] | null>(null); // Typowanie można dostosować do modelu konta
    const { accountNumber } = useParams<{ accountNumber: string }>();
    const [viewMode, setViewMode] = React.useState<"all" | "weekly">("all");

    if (!accountNumber) return;

    console.log("accountNumber", accountNumber);
    useEffect(() => {
        const fetchAccountData = async () => {
            try {
                const account = await fetchAccountDetails(accountNumber);
                setAccountData(account);
            } catch (error: any) {
                if (error.response && error.response.status === 404) {
                    message.error("Nie znaleziono konta o podanym numerze.");
                } else {
                    message.error(`Wystąpił błąd: ${error.message}`);
                }
            }
        };
        fetchAccountData();
    }, [accountNumber]);

    useEffect(() => {
        if (!accountData) return;
        const fetchTransactionData = async () => {
            try {
                const transactions = await fetchTransactions(accountData.number);
                setTransactionData(transactions);
            } catch (error: any) {
                if (error.response && error.response.status === 404) {
                    message.error("Nie znaleziono transakcji dla tego konta.");
                } else {
                    message.error(`Wystąpił błąd: ${error.message}`);
                }
            }
        };
        fetchTransactionData();
    }, [accountData]);


// ...pozostały kod bez zmian

    let initialBalance = 0;
    let chartData: { date: string, saldo: number, income:number, expenditure: number }[] = [];

    if (accountData && transactionData) {
        const deposits = transactionData.filter(t => t.transactionType === "DEPOSIT").reduce((sum, t) => sum + t.amount, 0);
        const withdrawals = transactionData.filter(t => t.transactionType === "WITHDRAWAL").reduce((sum, t) => sum + t.amount, 0);
        const transfers = transactionData.filter(t => t.transactionType === "TRANSFER").reduce((sum, t) => sum + t.amount, 0);
        initialBalance = accountData.balance - deposits + transfers + withdrawals;
        const sortedTransactions = [...transactionData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        chartData = sortedTransactions.reduce<{ date: string, saldo: number, income: number, expenditure: number }[]>(
            (acc, t) => {
                const prevSaldo = acc.length > 0 ? acc[acc.length - 1].saldo : initialBalance;
                const isIncome = t.transactionType === "DEPOSIT";
                const isExpenditure = t.transactionType === "WITHDRAWAL" || t.transactionType === "TRANSFER";
                const newSaldo = isIncome ? prevSaldo + t.amount : prevSaldo - t.amount;
                acc.push({
                    date: new Date(t.date).toLocaleString("pl-PL"),
                    saldo: newSaldo,
                    income: isIncome ? t.amount : 0,
                    expenditure: isExpenditure ? t.amount : 0
                });
                return acc;
            },
            [{ date: "Początek", saldo: initialBalance, income: 0, expenditure: 0 }]
        );
    }
    let weeklyChartData: { date: string, income: number, expenditure: number }[] = [];
    if (viewMode === "weekly" && chartData.length > 1) {
        const dailyMap = new Map<string, { income: number, expenditure: number }>();
        chartData.forEach(({ date, income, expenditure }) => {
            if (date === "Początek") return;
            const day = date.split(",")[0]; // tylko data bez godziny
            if (!dailyMap.has(day)) {
                dailyMap.set(day, { income: 0, expenditure: 0 });
            }
            const prev = dailyMap.get(day)!;
            dailyMap.set(day, {
                income: prev.income + income,
                expenditure: prev.expenditure + expenditure
            });
        });
        weeklyChartData = Array.from(dailyMap.entries()).map(([date, { income, expenditure }]) => ({
            date,
            income,
            expenditure
        }));
    }

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (!active || !payload || !payload.length) return null;

        // Sprawdź strukturę payload

        const data = payload[0].payload;
        if (!data) return null;

        const { income = 0, expenditure = 0 } = data;
        return (
            <div style={{ background: "#777", border: "1px solid #ccc", padding: 10 }}>
                <div style={{ fontWeight: "bold", marginBottom: 8 }}>{label}</div>
                <div>
                    <span style={{ fontWeight: 500 }}>INCOME:</span>{" "}
                    {new Intl.NumberFormat('pl-PL', { style: 'currency', currency: accountData!.currency }).format(income)}
                </div>
                <div>
                    <span style={{ fontWeight: 500 }}>EXPENDITURE:</span>{" "}
                    {new Intl.NumberFormat('pl-PL', { style: 'currency', currency: accountData!.currency }).format(expenditure)}
                </div>
            </div>
        );
    };
    console.log(viewMode, "ViewMode");
    return (
        <Content style={{ padding: "20px", overflowX: "hidden", maxWidth: "100%" }}>
        <h1>Account Page</h1>
            <p>This is the account page where you can manage your account details.</p>
            {accountData ? (
                <p>Numer konta to: {accountData.number}</p>
            ) : (
                <p>Ładowanie danych konta...</p>
            )}
            <Segmented
                style={{ outline: "1px solid", outlineOffset: "2px", padding: "2px", marginBottom: "20px"}}
                options={["all", "weekly"]}
                value={viewMode}
                onChange={setViewMode}>
            </Segmented>
            {accountData && transactionData && chartData.length > 1 && viewMode === "all" ? (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart width={400} height={300} data={chartData}>
                        <CartesianGrid stroke="#ccc"/>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <Tooltip content={CustomTooltip}/>
                        <Line type="monotone" dataKey="saldo" stroke="#8884d8"/>
                    </LineChart>
                </ResponsiveContainer>
            ) : accountData && transactionData && weeklyChartData.length > 0 && viewMode === "weekly" ? (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weeklyChartData}>
                        <CartesianGrid stroke="#ccc"/>
                        <XAxis dataKey="date"/>
                        <YAxis/>
                        <Tooltip
                            content={({ active, payload, label }) => {
                                if (!active || !payload || !payload.length) return null;
                                const data = payload[0].payload;
                                return (
                                    <div style={{ background: "#777", border: "1px solid #ccc", padding: 10}}>
                                        <div style={{ fontWeight: "bold", marginBottom: 8 }}>{label}</div>
                                        <div>
                                            <span style={{ color: "green", fontWeight: 500 }}>PRZYCHODY:</span>{" "}
                                            {new Intl.NumberFormat('pl-PL', { style: 'currency', currency: accountData.currency }).format(data.income)}
                                        </div>
                                        <div>
                                            <span style={{ color: "red", fontWeight: 500 }}>WYDATKI:</span>{" "}
                                            {new Intl.NumberFormat('pl-PL', { style: 'currency', currency: accountData.currency }).format(data.expenditure)}
                                        </div>
                                    </div>
                                );
                            }}
                        />
                        <Line type="monotone" dataKey="income" stroke="green" name="Przychody"/>
                        <Line type="monotone" dataKey="expenditure" stroke="red" name="Wydatki"/>
                    </LineChart>
                </ResponsiveContainer>
            ) : (
                <p>Ładowanie wykresu...</p>
            )}
            <Row gutter={[48, 24]}>
                <Col xs={48} md={12}>
                    {transactionData ? (
                        transactionData.map(transaction => (
                            <Card
                                key={transaction.id}>
                                <p>
                                    <strong style={{ color: transaction.transactionType === "DEPOSIT" ? "green" : "red" }}>
                                        Kwota: {transaction.transactionType === "DEPOSIT" ? transaction.amount : `- ${transaction.amount}`}
                                    </strong>
                                </p>
                                <p>{new Date(transaction.date).toLocaleString("pl-PL")}</p>
                                <p>{transaction.description}</p>
                                <p>Status: {transaction.transactionStatus}</p>
                            </Card>
                        ))
                    ) : (
                        <p>Ładowanie transakcji...</p>
                    )}
                </Col>
                <Col xs={48} md={12}>

                        {accountData ? (
                            <Card>
                                <h2>Konto: {accountData.name}</h2>
                                <p>Stan konta: {accountData.balance} {accountData.currency}
                                    <span style={{ color: "green" }}> (+{((accountData.balance/initialBalance-1)*100).toFixed(2)}%)</span></p>
                                <p>Typ konta: {accountData.type}</p>
                            </Card>
                        ) : (
                            <h2>Ładowanie danych konta...</h2>
                        )}

                </Col>
            </Row>


        </Content>
    );
}

export default Account;