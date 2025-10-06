import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'antd/dist/reset.css';
import '@ant-design/v5-patch-for-react-19';
import App from './App.tsx'
import React from 'react';
import "./i18n";
import { BrowserRouter } from "react-router-dom";

// Oficialny sposób z dokumentacji pozwalający na renderowanie aplikacji React w trybie ścisłym, poniżej dokumentacja:
// https://react.dev/reference/react-dom/client/createRoot
// https://react.dev/reference/react/StrictMode
const domNode = document.getElementById('app');
const root = createRoot(domNode!);
root.render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
)
