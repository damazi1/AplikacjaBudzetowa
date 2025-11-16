import React, {useState} from "react";
import {Row, Col} from "antd";
import {DateRangePicker} from "@components/common/DataRangePicker.tsx";
import dayjs, {type Dayjs} from "dayjs";
import {AccountDetails} from "@components/account/AccountDetails.tsx";
import {AccountNewTransaction} from "@components/account/AccountNewTransaction.tsx";
import {AccountTransactions} from "@components/account/AccountTransactions.tsx";


export function AccountPage() {
    const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
        dayjs().startOf("month"),
        dayjs().endOf("month"),
        ])
    return (
        <Row>
            <Col span={12}>
                    <h1>Konto bankowe</h1>
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
        </Row>
    )
}