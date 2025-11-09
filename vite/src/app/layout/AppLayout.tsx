import React from "react";
import { Outlet } from "react-router-dom";
import {Flex, Layout} from "antd";
import {Content} from "antd/es/layout/layout";
import Navbar from "../../components/Navbar.tsx";
import MyFooter from "../../components/MyFooter.tsx";

/*  TODO: Dodać style do ogólnego wyglądu aplikacji
 *  https://ant.design/components/layout
 */

export function AppLayout() {
    return (
        <Flex gap="middle" wrap>
            <Layout style={{minHeight: "100vh"}}>
                <Navbar/>
                <Content>
                    <Outlet/>
                </Content>
                <MyFooter/>
            </Layout>
        </Flex>
    );
}