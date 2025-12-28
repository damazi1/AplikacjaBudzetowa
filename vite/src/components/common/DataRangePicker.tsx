import React from "react";
import { DatePicker } from "antd";
import dayjs, { type Dayjs } from "dayjs";
import locale from "antd/es/date-picker/locale/en_US";

type Props = {
  value: [Dayjs, Dayjs];
  onChange: (range: [Dayjs, Dayjs]) => void;
};

export function DateRangePicker({ value, onChange }: Props) {
  return (
    <DatePicker.RangePicker
      locale={locale}
      format="DD-MM-YYYY"
      placeholder={["Start Date", "End Date"]}
      value={value}
      onChange={(dates) => {
        if (!dates) {
          onChange([dayjs().startOf("month"), dayjs().endOf("month")]);
        } else {
          onChange([dates[0]!.startOf("day"), dates[1]!.endOf("day")]);
        }
      }}
      allowClear={true}
      inputReadOnly={false}
    />
  );
}