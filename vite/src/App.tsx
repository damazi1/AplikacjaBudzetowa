import React from "react";
import './Styles/Layout.css';
import {Layout} from "antd";
import MyFooter from "./components/MyFooter.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./components/Home.tsx";
import Navbar from "./components/Navbar.tsx";
import Sidebar from "./components/Sidebar.tsx";
import Auth from "./components/Auth.tsx";
import Details from "./components/Details.tsx";
import Account from "./components/Account.tsx";

// Destrukturyzacja komponentów Layout z Ant Design
// aby uprościć kod i uniknąć powtarzania Layout.
// W ten sposób możemy używać Sider i Content bez prefiksu Layout.
const { Content } = Layout;

const App: React.FC = () => {

    return (
        <BrowserRouter>
            <Layout style={{ minHeight: '100vh' }}>
                <Navbar/>
                <Layout>
                    <Sidebar/>
                    <Content style={{flex: 1, minHeight: 0}}>
                        <Routes>
                            <Route path="/"  element={<Home/>} />
                            <Route path="/auth"  element={<Auth/>} />
                            <Route path="/details/:login" element={<Details/>} />
                            <Route path="/account/:accountNumber" element={<Account/>} />
                        </Routes>
                    </Content>
                </Layout>
                <MyFooter/>
            </Layout>
        </BrowserRouter>

    );
};

export default App;