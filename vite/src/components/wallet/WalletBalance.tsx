import React, {useEffect, useState} from "react";
import {Card, Col, message, Row, Spin} from "antd";
import {type Wallet} from "../../models/Wallet.ts";
import  "../../styles/Wallet.css"
import {getWalletById, periodWalletBalance} from "../../services/WalletService.tsx";
import {useParams} from "react-router-dom";

export type WalletBalanceProps = {
    timeFrom?: string;
    timeTo?: string;
}



export function WalletBalance({timeFrom, timeTo}: WalletBalanceProps){

    const [ExpensesAndIncomes, setExpensesAndIncomes] = useState<any>(null);
    const [wallet, setWallet] = useState<Wallet>({} as Wallet);
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (!id) return;
        const load = async () => {
            try {
                const data = await getWalletById(id);
                setWallet(data);
            } catch (e: any) {
                message.error(e?.message || "Błąd pobierania portfela");
            }
        };
        load();
    }, [id]);

    useEffect(() =>  {
        if (!wallet.id || !timeFrom || !timeTo) return;
        const fetchPeriod = async () => {
            try {
                const response = await periodWalletBalance({
                    walletId: id!,
                    startDate: timeFrom!,
                    endDate: timeTo!
                });
                setExpensesAndIncomes(response);
            } catch (e: any) {
                console.error(e?.message || "Error fetching period transactions");
            }
        };
        fetchPeriod();
        }, [timeFrom, timeTo, wallet.id]);


    // TODO: Funkcja odpowiedzialna z wyświetlanie 2 miejsc po przecinku
    return (
        <div>
            <Row>
                <Col span={6}>
                    <Card style={{height: "80%"}} title={"Current wallet balance"}>
                        {wallet.balance > 0 ?
                        <p className={"PositiveTransaction"}>{wallet.balance.toFixed(2)} {wallet.currency}</p>:
                        <p className={"NegativeTransaction"}>{wallet.balance} {wallet.currency}</p>}
                    </Card>
                </Col>
                { ExpensesAndIncomes ?
                    <Col span={6}>
                        <Card style={{height: "80%"}} title={"Period balance change"}>
                            {ExpensesAndIncomes.balanceChange >= 0 ?
                                <p className={"PositiveTransaction"}>{ExpensesAndIncomes.balanceChange.toFixed(2)} {wallet.currency}</p>:
                                <p className={"NegativeTransaction"}>{ExpensesAndIncomes} {wallet.currency}</p>
                            }
                        </Card>
                    </Col> : <Spin/>
                }
                { ExpensesAndIncomes ?
                    <Col span={6} >
                        <Card style={{height: "80%"}} title={"Period Expenses"}>
                            <p className={"NegativeTransaction"}>{ExpensesAndIncomes.totalExpenses.toFixed(2)} {wallet.currency} </p>
                        </Card>
                    </Col> : <Spin/>
                }
                { ExpensesAndIncomes ?
                    <Col span={6}>
                        <Card style={{height: "80%"}} title={"Period Income"}>
                            <p className={"PositiveTransaction"}>{ExpensesAndIncomes.totalIncome.toFixed(2)} {wallet.currency} </p>
                        </Card>
                    </Col> : <Spin/>
                }



            </Row>
        </div>
    );
}