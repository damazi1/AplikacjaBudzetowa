import React from "react";
import Select, { components, type GroupBase, type OptionProps, type SingleValueProps } from "react-select";
import { CATEGORIES, type Category } from "../models/icons";
import {Icon} from "@iconify/react";

export type CategoryOption = Category;

const optionStyles = {
    control: (base: any) => ({
        ...base,
        minHeight: 44
    }),
    option: (base: any, state: any) => ({
        ...base,
        paddingTop: 8,
        paddingBottom: 8
    }),
    singleValue: (base: any) => ({
        ...base,
        display: "flex",
        alignItems: "center",
        gap: 8
    })
};

// Ikona w kółku z tłem w kolorze kategorii
function BadgeIcon({ icon, color }: { icon: string; color?: string }) {
    return (
        <span
            style={{
        display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: color ?? "#e2e8f0",
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05)"
    }}
>
    <Icon icon={icon} color={"#ffffff"}/>
        </span>
);
}

// Custom option z ikoną
const Option = (props: OptionProps<CategoryOption, false, GroupBase<CategoryOption>>) => {
    const data = props.data;
    return (
        <components.Option {...props}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <BadgeIcon icon={data.icon} color={data.color} />
    <span>{data.label}</span>
    </div>
    </components.Option>
);
};

// Wyświetlanie wybranej wartości
const SingleValue = (props: SingleValueProps<CategoryOption, false, GroupBase<CategoryOption>>) => {
    const data = props.data;
    return (
        <components.SingleValue {...props}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <BadgeIcon icon={data.icon} color={data.color} />
    <span>{data.label}</span>
    </div>
    </components.SingleValue>
);
};

type Props = {
    value?: CategoryOption | null;
    onChange?: (value: CategoryOption | null) => void;
    placeholder?: string;
    categories?: CategoryOption[];
};

export const CategorySelect: React.FC<Props> = ({
                                                    value,
                                                    onChange,
                                                    placeholder = "Select category...",
                                                    categories = CATEGORIES
                                                }) => {
    return (
        <Select<CategoryOption, false>
            placeholder={placeholder}
    options={categories}
    value={value ?? null}
    onChange={(opt) => onChange?.(opt ?? null)}
    getOptionLabel={(opt) => opt.label}
    getOptionValue={(opt) => opt.value}
    components={{ Option, SingleValue }}
    styles={optionStyles}
    menuPortalTarget={document.body}
    menuPosition="fixed"
        />
);
};