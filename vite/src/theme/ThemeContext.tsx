import React from "react";
import { ConfigProvider } from "antd";
import plPL from "antd/locale/pl_PL";

type ThemeMode = "light" | "dark";

type ThemeContextValue = {
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
    toggle: () => void;
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

const STORAGE_KEY = "app-theme";

function getInitialMode(): ThemeMode {
    // 1) z localStorage
    const saved = typeof window !== "undefined" ? (localStorage.getItem(STORAGE_KEY) as ThemeMode | null) : null;
    if (saved === "light" || saved === "dark") return saved;
    // 2) z systemu
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
    }
    // 3) fallback
    return "light";
}

function applyDomAttributes(mode: ThemeMode) {
    if (typeof document !== "undefined") {
        document.documentElement.setAttribute("data-theme", mode);
        // opcjonalnie: kolor paska adresu w mobile
        const themeColor = mode === "dark" ? "#0f2135" : "#ffffff";
        let meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
        if (!meta) {
            meta = document.createElement("meta");
            meta.name = "theme-color";
            document.head.appendChild(meta);
        }
        meta.content = themeColor;
    }
}

export function useTheme() {
    const ctx = React.useContext(ThemeContext);
    if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
    return ctx;
}

type Props = {
    children: React.ReactNode;
    borderRadius?: number;
};

export function ThemeProvider({ children, borderRadius = 12 }: Props) {
    const [mode, setMode] = React.useState<ThemeMode>(getInitialMode);

    React.useEffect(() => {
        localStorage.setItem(STORAGE_KEY, mode);
        applyDomAttributes(mode);
    }, [mode]);

    const value = React.useMemo<ThemeContextValue>(
        () => ({
            mode,
            setMode,
            toggle: () => setMode((m) => (m === "dark" ? "light" : "dark")),
        }),
        [mode]
    );

    return (
        <ThemeContext.Provider value={value}>
            <ConfigProvider
                locale={plPL}
                theme={{
                    token: {
                        colorPrimary: mode === "dark" ? "1d20b9" : "#22c55e", // zielony
                        borderRadius,
                        colorBgBase: mode === "dark" ? "262626" : "#ffffff",
                        colorText: mode === "dark" ? "#ffffff" : "rgba(0,0,0,0.88)",
                    },
                    components: {
                        Select: {
                            // tekst w kontrolce i w opcjach
                            colorText: mode === "dark" ? "#ffffff" : undefined,
                            // tło zaznaczonej opcji w menu
                            optionSelectedBg: mode === "dark" ? "#223043" : undefined,
                            // kolor zaznaczonej opcji
                            optionSelectedColor: mode === "dark" ? "#ffffff" : undefined,
                            // tło opcji w hover/focus
                            optionActiveBg: mode === "dark" ? "#1c2736" : undefined,
                            // tło kontrolki (jeśli chcesz ją rozjaśnić/przyciemnić)
                            selectorBg: mode === "dark" ? "#111827" : undefined,
                        }
                    }
                }}
            >
                {children}
            </ConfigProvider>
        </ThemeContext.Provider>
    );
}