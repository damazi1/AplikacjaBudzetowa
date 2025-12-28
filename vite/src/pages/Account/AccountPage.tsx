import React, {useState} from "react";
import {Row, Col} from "antd";
import {DateRangePicker} from "@components/common/DataRangePicker.tsx";
import dayjs, {type Dayjs} from "dayjs";
import {AccountDetails} from "@components/account/AccountDetails.tsx";
import {AccountNewTransaction} from "@components/account/AccountNewTransaction.tsx";
import {AccountTransactions} from "@components/account/AccountTransactions.tsx";
import {AccountCharts} from "@components/account/AccountCharts.tsx";
import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";


export function AccountPage() {
    const {accountId} = useParams<{accountId?: string}>();
    const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
        dayjs().startOf("month"),
        dayjs().endOf("month"),
        ])
    const {t} = useTranslation();
    return (
        <Row>
            <Col span={12}>
                    <h1>{t("Bank account")}</h1>
            </Col>
            <Col span={12} style={{textAlign:"right"}}>
                <DateRangePicker value={dateRange} onChange={setDateRange}/>
            </Col>
            <Col span={24}>
                <AccountDetails/>
            </Col>
            <Col span={12}>
                <AccountNewTransaction />
            </Col>
            <Col span={12}>
                <AccountTransactions/>
            </Col>
            <Col span={24}>
                <AccountCharts
                    accountId={accountId!}
                    dateFrom={dateRange[0].format("YYYY-MM-DD HH:mm:ss")}
                    dateTo={dateRange[1].format("YYYY-MM-DD HH:mm:ss")}
                />
            </Col>
        </Row>
    )
}