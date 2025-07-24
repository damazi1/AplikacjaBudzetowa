import React, {useState} from 'react';
import {Layout, Menu} from "antd";
import {useNavigate} from "react-router-dom";
import {HomeOutlined, UserOutlined} from "@ant-design/icons";

// Ścieżki odpowiadające kluczom zakładek
const tabKeyToPath: Record<string, string> = {
    '1': '/',
    '2': '/test',
};

// Destrukturyzacja komponentów Layout z Ant Design
const { Sider } = Layout;

// Komponent Sidebar
const Sidebar: React.FC = () => {
    // ustawienie stanu dla złożoności paska bocznego
    const [collapsed, setCollapsed] = useState(false);

    const navigate = useNavigate();

    // Definicja elementów menu
    const items = [
        { key: '1', icon: <HomeOutlined/>, label: 'Strona Główna' },
        { key: '2', icon: <UserOutlined />, label: 'Tescik' },
    ];
    // Funkcja obsługująca kliknięcia w menu
    const handleMenuClick = (e: { key: string }) => {
        const path = tabKeyToPath[e.key];
        if (path) navigate(path);
    };

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className="demo-logo-vertical" />
            <Menu theme={"dark"} defaultSelectedKeys={['1']} mode="inline" items={items} onClick={handleMenuClick} />
        </Sider>
    )

}

export default Sidebar;