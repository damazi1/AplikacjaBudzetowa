import React from "react";
import "../..//i18n";
import {ThemeProvider} from "../../theme"; // inicjalizacja i18next poprzez side-effect

type Props = { children: React.ReactNode };

export function AppProviders({ children }: Props) {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    );
}