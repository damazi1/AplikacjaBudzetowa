import React, { useRef } from "react";
import './styles/Layout.css';
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
import Signup from "./components/Signup.tsx";
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { useLocation } from 'react-router-dom';
import {QueryParamProvider} from "use-query-params";
import {ReactRouter6Adapter} from "use-query-params/adapters/react-router-6";
import queryString from "query-string";
import Wallet from "./components/Wallet.tsx";

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
    const location = useLocation();
    const nodeRef = useRef(null);

    return (
        <QueryParamProvider       adapter={ReactRouter6Adapter}
                                  options={{
                                      searchStringToObject: queryString.parse,
                                      objectToSearchString: queryString.stringify,
                                  }}
        >
        <ThemeProvider>
            <ThemeWrapper>
                    <Layout style={{ minHeight: "100vh", display: "flex", flexDirection: "column",  overflow: "hidden" }}>
                        <Navbar/>
                        <Layout>
                            {/*<Sidebar/>*/}
                            <Layout style={{ width: "100%" }}>
                            <Content style={{flex: 1, minHeight: 0}}>
                                <SwitchTransition>
                                    <CSSTransition
                                        key={location.pathname}
                                        timeout={300}
                                        classNames="fade"
                                        unmountOnExit
                                        nodeRef={nodeRef}
                                    >
                                        <div ref={nodeRef}>
                                            <Routes>
                                                <Route path="/" element={<Home/>}/>
                                                <Route path="/auth/login" element={<Auth/>}/>
                                                <Route path="/auth/signup" element={<Signup/>}/>
                                                <Route path="/details/:login" element={<Details/>}/>
                                                <Route path="/account/:accountNumber" element={<Account/>}/>
                                                <Route path="/wallet/:walletId" element={<Wallet/>}/>
                                            </Routes>
                                        </div>
                                    </CSSTransition>
                                </SwitchTransition>

                            </Content>
                            <MyFooter/>
                            </Layout>
                        </Layout>
                    </Layout>
            </ThemeWrapper>
        </ThemeProvider>
        </QueryParamProvider>


    );
};

export default App;