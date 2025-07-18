import {useNavigate} from "react-router-dom";
import {HomeOutlined, UserOutlined} from "@ant-design/icons";
import {Layout, Menu} from "antd";
import React from "react";

const tabKeyToPath: Record<string, string> = {
    '1': '/',
    '2': '/test',
};

const { Header } = Layout;

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const items = [
        { key: '1', label: (<span><HomeOutlined /> Strona Główna</span>) },
        { key: '2', label: (<span><UserOutlined /> Tescik</span>) },
    ];
    const handleMenuClick = (e: { key: string }) => {
        const path = tabKeyToPath[e.key];
        if (path) navigate(path);
    };
    return (
        <Header style={{ display: 'flex', alignItems: 'center' }}>
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                items={items}
                style={{minWidth: 0, flex: 1,  justifyContent: 'flex-end'}}
                onClick={handleMenuClick}
            />
        </Header>
    );
}

export default Navbar;