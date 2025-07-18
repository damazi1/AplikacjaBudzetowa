import {useLocation, useNavigate} from "react-router-dom";
import {HomeOutlined, UserOutlined} from "@ant-design/icons";
import {Layout, Menu} from "antd";
import React, {useState} from "react";

// Ścieżki odpowiadające kluczom zakładek
const tabKeyToPath: Record<string, string> = {
    '1': '/',
    '2': '/auth',
};
const pathToTabKey: Record<string, string> = {
    '/': '1',
    '/auth': '2',
};

// Destrukturyzacja komponentów Layout z Ant Design
const { Header } = Layout;

// Komponent Navbar
const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedKey, setSelectedKey] = useState<string>('');
    React.useEffect(() => {
        setSelectedKey(pathToTabKey[location.pathname]);
    }, [location.pathname]);

    // Definicja elementów menu
    const items = [
        { key: '1', label: (<span><HomeOutlined /> Strona Główna</span>) },
        { key: '2', label: (<span><UserOutlined /> Login</span>) },
    ];

    // Funkcja obsługująca kliknięcia w menu
    const handleMenuClick = (e: { key: string }) => {
        setSelectedKey(e.key);
        const path = tabKeyToPath[e.key];
        if (path) navigate(path);
    };
    return (
        <Header style={{ display: 'flex', alignItems: 'center' }}>
            <Menu
                theme="dark"
                mode="horizontal"
                selectedKeys={[selectedKey]}
                items={items}
                style={{minWidth: 0, flex: 1,  justifyContent: 'flex-end'}}
                onClick={handleMenuClick}
            />
        </Header>
    );
}

export default Navbar;