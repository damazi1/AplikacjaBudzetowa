import {useNavigate} from "react-router-dom";
import {SettingOutlined, UserOutlined} from "@ant-design/icons";
import {Drawer, Dropdown, Layout, message, Segmented} from "antd";
import React, {useEffect, useState} from "react";
import {useTheme} from "../theme/ThemeContext.tsx";
import { fetchUserId } from "../services/userService.ts";
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
                message.error(err.response?.data?.error || err.message);
            }
        }
        fetchUserData();
    }, []);

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
        <Header style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
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
                        ? [{key: 'logout', label: (<span onClick={logout}><UserOutlined/> Wyloguj</span>)}]
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
                {
                    <Segmented
                        options={["dark", "light"]}
                        onChange={(value) => toggleTheme(value as "dark" | "light")}
                        defaultValue={theme}
                    />
                }

            </Drawer>
        </Header>
    );
}

export default Navbar;