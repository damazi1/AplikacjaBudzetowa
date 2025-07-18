import {useNavigate} from "react-router-dom";
import {UserOutlined} from "@ant-design/icons";
import {Dropdown, Layout, message} from "antd";
import React from "react";

// Ścieżki odpowiadające kluczom zakładek


// Destrukturyzacja komponentów Layout z Ant Design
const { Header } = Layout;

// Komponent Navbar
const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const login = localStorage.getItem('login');

    const logout = () => {
        localStorage.removeItem("jwt");
        localStorage.removeItem("login");
        localStorage.removeItem("role");
        // Przekierowanie na stronę logowania
        message.success("Pomyślnie wylogowano");
        navigate("/");
        window.location.reload();
    };


    return (
        <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Dropdown menu={{ items:  [
                login ?
                    {  key: "details", label: <span onClick={() => navigate(`details/${login}`)}>
                            Szczegóły konta</span>}
                    : {key: '1', label: <span onClick={() => navigate('/auth')}>
                            Zaloguj</span>},
                ...(login
                    ? [{ key: 'logout', label: (<span onClick={logout}><UserOutlined /> Wyloguj</span>) }]
                    : [])
            ] }} placement="bottom">
                    <span style={{ color: "#fff", cursor: "pointer" }}>
                        <UserOutlined />
                    </span>
            </Dropdown>
        </Header>
    );
}

export default Navbar;