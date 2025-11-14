import React, { useState } from "react";
import {Col, Row} from "antd";
import { useParams } from "react-router-dom";
import {WalletDetails} from "@components/wallet/WalletDetails.tsx";
import {WalletTransactions} from "@components/wallet/WalletTransactions.tsx";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import {WalletBalance} from "@components/wallet/WalletBalance.tsx";
import {WalletCharts} from "@components/wallet/WalletCharts.tsx";
import {WalletAddTransactionForm} from "@components/wallet/WalletAddTransactionForm.tsx";
import {DateRangePicker} from "@components/common/DataRangePicker.tsx";

export function WalletPage (){
    const { id } = useParams<{ id?: string }>();
    const [dateRange, setDateRange] = useState<[Dayjs , Dayjs]>([
        dayjs().startOf("month"),
        dayjs().endOf("month"),
    ]);

    return (
        <div>
            <Row>
                <Col span={12} style={{padding: "10px"}}>
                    <h1>Wallet</h1>
                </Col>
                <Col span={12} style={{textAlign: "right", padding: "10px"}} >
                    <DateRangePicker value={dateRange} onChange={setDateRange}/>
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