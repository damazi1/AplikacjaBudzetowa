import React from "react";
import { Button, Tooltip } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import { useTheme } from "./ThemeProvider";

export function ThemeSwitch() {
    const { mode, toggle } = useTheme();

    return (
        <Tooltip title={mode === "dark" ? "Przełącz na jasny" : "Przełącz na ciemny"}>
    <Button
        type="text"
    shape="circle"
    aria-label="Przełącz motyw"
    onClick={toggle}
    icon={mode === "dark" ? <SunOutlined /> : <MoonOutlined />}
    style={{ color: "#e6eef8" }}
    />
    </Tooltip>
);
}