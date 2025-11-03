import React from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import plPL from "antd/locale/pl_PL";
// Jeśli masz konfigurację i18n w src/i18n.tsx – import poniżej
import "../..//i18n"; // inicjalizacja i18next poprzez side-effect

type Props = { children: React.ReactNode };

export function AppProviders({ children }: Props) {
    return (
        <ConfigProvider
            locale={plPL}
            theme={{
                algorithm: antdTheme.darkAlgorithm, // dopasuj do motywu
                token: {
                    colorPrimary: "#22c55e",
                    borderRadius: 12,
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
}