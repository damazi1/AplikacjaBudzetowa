import React, { useEffect, useState, useMemo } from "react";
import Select, { components, type GroupBase, type OptionProps, type SingleValueProps } from "react-select";
import { Icon } from "@iconify/react";
import { type Category } from "../models/Category";
import { Categories } from "../services/CategoryService";

type CategoryOption = {
    value: string;      // wartość zwracana do formularza
    label: string;      // wyświetlana etykieta
    icon: string;
    color?: string;
};

interface CategorySelectProps {
    value?: string;                    // wartość z Form.Item
    onChange?: (val: string) => void;  // setter do Form.Item
}

function useCategories() {
    const [categories, setCategories] = useState<Category[] | Category | null>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        Categories()
            .then(data => {
                if (!mounted) return;
                if (Array.isArray(data)) setCategories(data);
                else setCategories([data]);
            })
            .catch(e => { if (mounted) setError(e.message ?? "Błąd"); })
            .finally(() => { if (mounted) setLoading(false); });
        return () => { mounted = false; };
    }, []);

    return { categories, loading, error };
}

function BadgeIcon({ icon, color }: { icon: string; color?: string }) {
    return (
        <span style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: color ?? "#e2e8f0",
            boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.05)"
        }}>
                      <Icon icon={icon} color="#ffffff" />
                    </span>
    );
}

const Option = (props: OptionProps<CategoryOption, false, GroupBase<CategoryOption>>) => (
    <components.Option {...props}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <BadgeIcon icon={props.data.icon} color={props.data.color} />
            <span>{props.data.label}</span>
        </div>
    </components.Option>
);

const SingleValue = (props: SingleValueProps<CategoryOption, false, GroupBase<CategoryOption>>) => (
    <components.SingleValue {...props}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <BadgeIcon icon={props.data.icon} color={props.data.color} />
            <span>{props.data.label}</span>
        </div>
    </components.SingleValue>
);

export const CategorySelect: React.FC<CategorySelectProps> = ({ value, onChange }) => {
    const { categories, loading, error } = useCategories();

    const options: CategoryOption[] = useMemo(() => {
        const arr = Array.isArray(categories) ? categories : (categories ? [categories] : []);
        return arr.map(c => ({
            value: c.label,     // zwracamy label jako wartość
            label: c.label,
            icon: c.icon,
            color: c.color,
        }));
    }, [categories]);

    const selectedOption = useMemo(
        () => options.find(o => o.value === value) ?? null,
        [options, value]
    );

    if (loading) return <div>Ładowanie kategorii...</div>;
    if (error) return <div>Błąd: {error}</div>;

    return (
        <Select<CategoryOption, false>
            placeholder="Wybierz kategorię..."
            options={options}
            value={selectedOption}
            onChange={opt => onChange?.(opt?.value ?? "")}
            getOptionLabel={o => o.label}
            getOptionValue={o => o.value}
            components={{ Option, SingleValue }}
            isSearchable={false}
            menuPortalTarget={document.body}
            menuPosition="fixed"
        />
    );
};