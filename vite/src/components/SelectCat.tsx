import React, { useEffect, useState, useMemo } from "react";
import Select, { components, type GroupBase, type OptionProps, type SingleValueProps } from "react-select";
import { Icon } from "@iconify/react";
import { type Category } from "../models/Category";
import { Categories } from "../services/CategoryService"; // musi zwracać Promise<Category[]>

type CategoryOption = {
    icon: string;
    label: string;
    color?: string;
};

function useCategories() {
    const [categories, setCategories] = useState<Category[] | Category | null>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;
        Categories()
            .then(data => {
                if (!mounted) return;
                // jeśli backend zwróci pojedynczy obiekt zamiast tablicy
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

const Option = (props: OptionProps<CategoryOption, false, GroupBase<CategoryOption>>) => {
    const d = props.data;
    return (
        <components.Option {...props}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <BadgeIcon icon={d.icon} color={d.color} />
                <span>{d.label}</span>
            </div>
        </components.Option>
    );
};

const SingleValue = (props: SingleValueProps<CategoryOption, false, GroupBase<CategoryOption>>) => {
    const d = props.data;
    return (
        <components.SingleValue {...props}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <BadgeIcon icon={d.icon} color={d.color} />
                <span>{d.label}</span>
            </div>
        </components.SingleValue>
    );
};

export const CategorySelect: React.FC = () => {
    const { categories, loading, error } = useCategories();
    const [selected, setSelected] = useState<CategoryOption | null>(null);

    const options: CategoryOption[] = useMemo(() => {
        const arr = Array.isArray(categories) ? categories : (categories ? [categories] : []);
        return arr.map(c => ({
            icon: c.icon,
            label: c.label,
            color: c.color,
        }));
    }, [categories]);

    if (loading) return <div>Ładowanie kategorii...</div>;
    if (error) return <div>Błąd: {error}</div>;

    return (
        <div>
            <Select<CategoryOption, false>
                placeholder="Wybierz kategorię..."
                options={options}
                onChange={opt => setSelected(opt)}
                getOptionLabel={o => o.label}
                getOptionValue={(o) => o.label}
                components={{ Option, SingleValue }}
                isSearchable={false}
                menuPortalTarget={document.body}
                menuPosition="fixed"
            />
            {selected && (
                <div>
                    Wybrano: {selected.label}
                </div>
                )
            }

        </div>

    );
};