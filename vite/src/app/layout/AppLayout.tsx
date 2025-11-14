import React from "react";
import { Outlet } from "react-router-dom";
import {Flex, Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import Navbar from "@components/common/Navbar.tsx";
import MyFooter from "@components/common/MyFooter.tsx";
import "@styles/Layout.css";

export function AppLayout() {
    return (
        <Flex gap="middle" wrap>
            <Layout className={"app-layout"}>
                <Navbar/>
                <Content className={"app-layout-content"}>
                    <Outlet />
                </Content>
                <MyFooter/>
            </Layout>
        </Flex>
    );
}