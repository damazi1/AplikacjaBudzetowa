import React from "react";
import {AppProviders} from "./providers/AppProviders.tsx";
import {AppRouter} from "./routes/router.tsx";

export function RootApp() {
    return (
        <AppProviders>
            <AppRouter/>
        </AppProviders>
    )
}