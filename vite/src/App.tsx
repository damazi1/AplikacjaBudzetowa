import React from "react";
import './Styles/Layout.css';
import {ConfigProvider, Layout, theme as antdTheme} from "antd";
import MyFooter from "./components/MyFooter.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home.tsx";
import Navbar from "./components/Navbar.tsx";
import Sidebar from "./components/Sidebar.tsx";
import Auth from "./components/Auth.tsx";
import Details from "./components/Details.tsx";
import Account from "./components/Account.tsx";
import {ThemeProvider, useTheme } from "./theme/ThemeContext.tsx";

// Destrukturyzacja komponentów Layout z Ant Design
// aby uprościć kod i uniknąć powtarzania Layout.
// W ten sposób możemy używać Sider i Content bez prefiksu Layout.
const { Content } = Layout;

const ThemeWrapper: React.FC<{children: React.ReactNode}> = ({children}) => {
    const {theme} = useTheme();
    return (
        <ConfigProvider
            theme={{
                algorithm: theme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
                token: theme === "dark"
                    ? {
                        colorBgBase: "#23272f", // jaśniejszy szary
                        colorBgContainer: "#2c313a",
                        colorTextBase: "#f0f0f0"
                    }
                    : {}
            }}
        >
            {children}
        </ConfigProvider>
    );
};

const App: React.FC = () => {

    return (
        <ThemeProvider>
            <ThemeWrapper>
                <BrowserRouter>
                    <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
                        <Navbar/>
                        <Layout>
                            <Sidebar/>
                            <Layout style={{ width: "100%" }}>
                            <Content style={{flex: 1, minHeight: 0}}>
                                <Routes>
                                    <Route path="/"  element={<Home/>} />
                                    <Route path="/auth"  element={<Auth/>} />
                                    <Route path="/details/:login" element={<Details/>} />
                                    <Route path="/account/:accountNumber" element={<Account/>} />
                                </Routes>
                            </Content>
                            <MyFooter/>
                            </Layout>
                        </Layout>
                    </Layout>
                </BrowserRouter>
            </ThemeWrapper>
        </ThemeProvider>

    );
};

export default App;