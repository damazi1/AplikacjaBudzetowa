import React, { useState } from "react";
import {Col, Row, DatePicker} from "antd";
import { useParams } from "react-router-dom";
import {WalletDetails} from "@components/wallet/WalletDetails.tsx";
import {WalletTransactions} from "@components/wallet/WalletTransactions.tsx";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import {WalletBalance} from "@components/wallet/WalletBalance.tsx";
import {WalletCharts} from "@components/wallet/WalletCharts.tsx";
import {WalletAddTransactionForm} from "@components/wallet/WalletAddTransactionForm.tsx";

export function WalletPage (){
    const { id } = useParams<{ id?: string }>();
    const [dateRange, setDateRange] = useState<[Dayjs , Dayjs]>([
        dayjs().startOf("month"),
        dayjs().endOf("month"),
    ]);

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
                            }
                        }}
                        allowClear={true}
                        inputReadOnly={false}
                        />
                </Col>
                <Col span={24}>
                    <WalletDetails/>
                </Col>
                <Col span={24}>
                        <WalletBalance
                            timeFrom={dateRange[0].format("YYYY-MM-DD HH:mm:ss")}
                            timeTo={dateRange[1].format("YYYY-MM-DD HH:mm:ss")}
                        />
                </Col>
                <Col span={8}>
                    <WalletAddTransactionForm
                        walletId={id!}
                    />
                </Col>
                <Col span={16}>
                    <WalletTransactions
                        walletId={id!}
                        dateFrom={dateRange[0].format("YYYY-MM-DD HH:mm:ss")}
                        dateTo={dateRange[1].format("YYYY-MM-DD HH:mm:ss")}
                    />
                </Col>
                <Col span={24}>
                    <WalletCharts/>
                </Col>
            </Row>
        </div>

    );
}