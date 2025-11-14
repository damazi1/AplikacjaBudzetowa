import React, {useState} from "react";
import {Row, Col} from "antd";
import {DateRangePicker} from "@components/common/DataRangePicker.tsx";
import dayjs, {type Dayjs} from "dayjs";


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
        </Row>
    )
}