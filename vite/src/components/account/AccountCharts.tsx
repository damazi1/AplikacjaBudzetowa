import React from "react";
import {AccountBarChart} from "@components/account/AccountBarChart.tsx";
import {AccountLineChart} from "@components/account/AccountLineChart.tsx";

type AccountChartsProps = {
    accountId: string;
    dateFrom: string;
    dateTo: string;
};

export const AccountCharts: React.FC<AccountChartsProps> = ({
                                                                    accountId,
                                                                    dateFrom,
                                                                    dateTo,
                                                                })=> {
    return (
        <div>
            <AccountBarChart accountId={accountId} from={dateFrom} to={dateTo}/>
            <AccountLineChart accountId={accountId} from={dateFrom} to={dateTo}/>
        </div>
    );
                                                                }