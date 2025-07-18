import {Row, Col, Typography, Card, message} from 'antd';
import '../styles/Home.css';
import React, {useEffect, useState} from 'react';
import {fetchUsers} from "../services/userService.ts";
import {useNavigate} from "react-router-dom";
import type {Account} from "../models/Accounts.ts";
const { Title } = Typography;
import { fetchAccounts } from "../services/accountService"; // popraw ścieżkę jeśli inna

const Home: React.FC = () => {
    const [loginData, setLogin] = useState<string | null>(null);
    const [AccountData, setAccounts] = useState<Account[] | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchLoginData = async () => {
            try {
                const users = await fetchUsers();
                setLogin(users.join('\n'));
            } catch (err: any) {
                message.error(err.response?.data?.error || err.message);
            }
        };
        fetchLoginData();
    }, []);

    useEffect(() => {
        const fetchAccountData = async () => {
            try{
                const accounts = await fetchAccounts();
                setAccounts(accounts);
            } catch (err: any) {
                message.error(err.response?.data?.error || err.message);
            }
        };
        fetchAccountData();
    }, []);
    const login = localStorage.getItem('login');
    const role = localStorage.getItem('role');
    if (role === null) {
        return (
            <div className="home-ant-container">
                <Title level={1} style={{textAlign: 'center', color: '#fff', marginBottom: 32}}>
                    Witaj {login ? login : "Użytkowniku"}!
                </Title>
                <h2 style={{color: '#fff', textAlign: 'center'}}>Aby skorzystać ze strony musisz być zalogowany</h2>
                <h2 style={{color: '#fff', textAlign: 'center'}}><a  onClick={() => navigate('/auth')}>Kliknij tutaj, aby zalogować</a></h2>
            </div>
        )
    }
    return (
        <div className="home-ant-container">
            <Title level={1} style={{textAlign: 'center', color: '#fff', marginBottom: 32}}>
                Witaj {login ? login : "Użytkowniku"}!
            </Title>

            <Row gutter={[24, 24]} justify="center">
                <Col xs={24} md={8}>
                    <Card className="ant-home-card" variant="outlined" style={{whiteSpace: 'pre-line'}}>
                        {loginData ? loginData : "Ładowanie..."}
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    {AccountData
                        ? AccountData.length > 0
                            ? AccountData.map(account => (
                                <Card key={account.number} className="ant-home-card" variant="outlined">
                                    <p><strong>name:</strong> {account.name}</p>
                                    <p><strong>balance:</strong> {account.balance} {account.currency}</p>
                                    <p><strong>Type:</strong> {account.type}</p>
                                </Card>
                            ))
                            : <Card className="ant-home-card" variant="outlined">
                                <strong>Nie znaleziono kont</strong>
                            </Card>
                        : <Card className="ant-home-card" variant="outlined">
                            <strong>Ładowanie kont...</strong>
                        </Card>
                    }
                </Col>
                <Col xs={24} md={8}>
                    <Card className="ant-home-card" variant="outlined">
                        <p>Opis funkcji 3 lub dowolny tekst.</p>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Home;