import React from "react";

import { Card, Col, Row } from "antd";
import {WalletPieChart} from "@components/wallet/WalletPieChart.tsx";
import {WalletBarChart} from "@components/wallet/WalletBarChart.tsx";
import {WalletLineChart} from "@components/wallet/WalletLineChart.tsx";
import {useTranslation} from "react-i18next";

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
    const {t} = useTranslation();
    return (
        <Row>
            <Col span={12}>
                <Card title = {t("Line chart of balance")}>
                    <WalletLineChart
                        walletId={walletId}
                        from={dateFrom}
                        to={dateTo}
                    />
                </Card>
            </Col>
            <Col span={12}>
                <Card title={t("Bar chart of expenses and income")}>
                    <WalletBarChart
                        walletId={walletId}
                        from={dateFrom}
                        to={dateTo}
                    />
                </Card>
            </Col>
            <Col span={24}>
                <Card title={t("Incomes and expenses")} style={{textAlign: "center", }} styles={{body: {placeItems: "center"}}}>
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