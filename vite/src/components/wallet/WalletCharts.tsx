import React from "react";

import { Card, Col, Row } from "antd";
import {LineCharts} from "@components/common/charts/LineCharts.tsx";
import {WalletPieChart} from "@components/wallet/WalletPieChart.tsx";
import {WalletBarChart} from "@components/wallet/WalletBarChart.tsx";

type WalletTransactionsProps = {
    walletId: string;
    dateFrom: string;
    dateTo: string;
};

export const WalletCharts: React.FC<WalletTransactionsProps> = ({
                                                                    walletId,
                                                                    dateFrom,
                                                                    dateTo,
                                                                })=> {
    return (
        <Row>
            <Col span={12}>
                <Card title = "Balans">
                    <LineCharts/>
                </Card>
            </Col>
            <Col span={12}>
                <Card title="Balans slupki">
                    <WalletBarChart
                        walletId={walletId}
                        from={dateFrom}
                        to={dateTo}
                    />
                </Card>
            </Col>
            <Col span={24}>
                <Card title="Wydatki i przychody">
                    <WalletPieChart
                        walletId={walletId}
                        from={dateFrom}
                        to={dateTo}
                    />
                </Card>
            </Col>
        </Row>
    );
}