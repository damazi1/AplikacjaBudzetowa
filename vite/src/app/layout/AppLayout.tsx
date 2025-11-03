import React from "react";
import { Outlet } from "react-router-dom";
import {Flex, Layout} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import {Footer} from "antd/es/modal/shared";

/*  TODO: Dodać style do ogólnego wyglądu aplikacji
 *  https://ant.design/components/layout
 */
export function AppLayout() {
    return (
        <Flex gap="middle" wrap>
            <Layout>
                <Header></Header>
                <Content>
                    <Outlet/>
                </Content>
                <Footer></Footer>
            </Layout>
        </Flex>
    );
}