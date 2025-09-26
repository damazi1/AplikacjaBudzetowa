import React, {useEffect, useState} from 'react';
import {Layout, Menu} from "antd";
import {useNavigate, useLocation} from "react-router-dom";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { fetchAccounts} from "../services/accountService.ts";
import type {Accounts} from "../models/Accounts.ts";

/**
 * Komponent Sidebar wyświetlający menu boczne.
 * Zawiera linki do stron (aktualnie Strona Główna i Konta Bankowe).
 * Korzysta z destrukturyzacji komponentów Layout z Ant Design.
 */
const { Sider } = Layout;

const Sidebar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [accounts, setAccounts] = useState<Accounts[] | null>(null);

    // Dane konta
        useEffect(() => {
            const fetchAccountss = async () => {
                try {
                    const accounts = await fetchAccounts();
                    setAccounts(accounts);
                } catch (err: any) {
                    setAccounts([]);
                }
            };
            fetchAccountss();
        }, []);

    const menuItems = [
        {
            key: 'home',
            icon: <HomeOutlined />,
            label: 'Strona Główna',
            onClick: () => navigate('/'),
        },
        ...([{
                key: 'accounts',
                icon: <UserOutlined/>,
                label: 'Konta Bankowe',
                children: accounts
                    ? accounts.length > 0
                        ? accounts.map((account) => ({
                            key: `/account/${account.number}`,
                            label: account.name,
                            onClick: () => navigate(`/account/${account.number}`),
                        }))
                        : [{
                            key: 'no-accounts',
                            label: 'Nie znaleziono kont',
                            disabled: true,
                        }]
                    : [{
                        key: 'loading',
                        label: 'Ładowanie kont...',
                        disabled: true,
                    }],
            }]
        ),
    ];


    /**
     * Renderuje komponent Sidebar.
     * To ten śmieszny pasek po lewej stronie, który zawiera linki do różnych stron.
     * Można go zwinąć lub rozwinąć strzałką w lewym dolnym rogu.
     *
     * W środku tego cudeńka znajduje się menu, które prowadzi do różnych stron
     * każda strona to osobny menu item.
     */
    return (
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
            <Menu theme="dark"
                  selectedKeys={[location.pathname]}
                  mode="inline"
                items={menuItems}
            />
        </Sider>
    );
};

export default Sidebar;