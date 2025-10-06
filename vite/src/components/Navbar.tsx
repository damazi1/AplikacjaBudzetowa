import {useNavigate} from "react-router-dom";
import {HomeOutlined, SettingOutlined, UserOutlined, FlagOutlined} from "@ant-design/icons";
import {Drawer, Dropdown, Layout, Segmented} from "antd";
import React, {useEffect, useState} from "react";
import {useTheme} from "../theme/ThemeContext.tsx";
import {fetchUserId, logoutUser} from "../services/userService.ts";
import type { User } from "../models/User.ts";
import { Select } from "antd";// Ścieżki odpowiadające kluczom zakładek
import { useTranslation } from "react-i18next";



// Destrukturyzacja komponentów Layout z Ant Design
const { Header } = Layout;

// Komponent Navbar
const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const [settingsOpen, setSettingsOpen] = useState(false);
    const { toggleTheme, theme } = useTheme();
    const [user, setUser] = useState<User|null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await fetchUserId()
                setUser(user);
            } catch (err: any) {
                setUser(null);
            }
        }
        fetchUserData();
    }, []);

    const handleLogout = async () => {
        await logoutUser();
        window.location.reload();
    };

    const { i18n } = useTranslation();

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    return (
        <Header style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
    <span style={{color: "#fff", fontWeight: "bold", fontSize: "22px",cursor: "pointer"}}
    onClick={() => navigate('/')}>
        <HomeOutlined></HomeOutlined> E-Wallet
    </span>
            <div style={{display: 'flex', alignItems: 'center'}}>
        <span
            style={{color: "#fff", cursor: "pointer", marginRight: '16px', fontSize: '20px'}}
            onClick={() => setSettingsOpen(true)}
        >
            <SettingOutlined/>
        </span>
{user?.login && (
    <Dropdown
        menu={{
            items: [
                {
                    key: "details",
                    label: (
                        <span onClick={() => navigate(`details/${user?.login}`)}>
                            Szczegóły konta
                        </span>
                    ),
                },
                {
                    key: 'logout',
                    label: (
                        <span onClick={handleLogout}>
                            <UserOutlined /> Wyloguj
                        </span>
                    ),
                },
            ],
        }}
        placement="bottom"
    >
        <span style={{ color: "#fff", cursor: "pointer", fontSize: '20px' }}>
            <UserOutlined />
        </span>
    </Dropdown>
)}
                <Drawer
                    title="Ustawienia"
                    placement="right"
                    onClose={() => setSettingsOpen(false)}
                    open={settingsOpen}
                >
                    <p>Motyw: </p>
                    <Segmented
                        options={["dark", "light"]}
                        onChange={(value) => toggleTheme(value as "dark" | "light")}
                        defaultValue={theme}
                    />
                    <p>Język: </p>
                    <Select
                        defaultValue={i18n.language}
                        style={{ width: 120 }}
                        onChange={lng => i18n.changeLanguage(lng)}
                        options={[
                            { value: "pl", label: "Polski" },
                            { value: "en", label: "English" }
                        ]}
                    />
                </Drawer>
            </div>
        </Header>
    );
}

export default Navbar;