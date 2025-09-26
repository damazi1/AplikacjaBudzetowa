import {useNavigate} from "react-router-dom";
import {HomeOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import {Drawer, Dropdown, Layout, Segmented} from "antd";
import React, {useEffect, useState} from "react";
import {useTheme} from "../theme/ThemeContext.tsx";
import {fetchUserId, logoutUser} from "../services/userService.ts";
import type { User } from "../models/User.ts";

// Ścieżki odpowiadające kluczom zakładek


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
                <Dropdown menu={{
                    items: [
                        user?.login ?
                            {
                                key: "details", label: <span onClick={() => navigate(`details/${user?.login}`)}>
                        Szczegóły konta</span>
                            }
                            : {
                                key: '1', label: <span onClick={() => navigate('/auth')}>
                        Zaloguj</span>
                            },
                        ...(user?.login
                            ? [{key: 'logout', label: (<span onClick={handleLogout}><UserOutlined/> Wyloguj</span>)}]
                            : [])
                    ]
                }} placement="bottom">
            <span style={{color: "#fff", cursor: "pointer", fontSize: '20px'}}>
                <UserOutlined/>
            </span>
                </Dropdown>
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
                </Drawer>
            </div>
        </Header>
    );
}

export default Navbar;