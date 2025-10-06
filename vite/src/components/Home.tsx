import {Row, Col, Typography, Card, message} from 'antd';
import '../styles/Home.css';
import React, {useEffect, useState} from 'react';
import {fetchUsers} from "../services/userService.ts";
import {useNavigate} from "react-router-dom";
import type {Accounts} from "../models/Accounts.ts";
const { Title } = Typography;
import { fetchAccounts } from "../services/accountService"; // popraw ścieżkę jeśli inna
import { fetchUserId } from "../services/userService.ts"; // popraw ścieżkę jeśli inna
import type { User } from "../models/User.ts"; // popraw ścieżkę jeśli inna

const Home: React.FC = () => {
    const [loginData, setLogin] = useState<string | null>(null);
    const [AccountData, setAccounts] = useState<Accounts [] | null>(null);
    const [UserData, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        if (UserData === null && !isLoading) {
            navigate('/auth/login');
        }
    }, [UserData, isLoading, navigate]);
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
        if (localStorage.getItem('loginSuccess')) {
            message.success('Login successful');
            localStorage.removeItem('loginSuccess');
        }
    }, []);

    useEffect(() => {
            const fetchAccountData = async () => {
                try {
                    const accounts = await fetchAccounts();
                    console.log(accounts);
                    setAccounts(accounts);
                } catch (err: any) {
                } finally {
                    setIsLoading(false);
                }
            };
            fetchAccountData();
    }, [] );

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = await fetchUserId();
                setUser(user);
            } catch (err: any) {
            }
        };
        fetchUserData();
    }, [] );
    if (UserData === null) {
        return (
            <div className="home-ant-container">
                <Title level={1} style={{textAlign: 'center', marginBottom: 32}}>
                    Witaj "Użytkowniku"!
                </Title>
                <h2 style={{ textAlign: 'center'}}>Aby skorzystać ze strony musisz być zalogowany</h2>
                <h2 style={{textAlign: 'center'}}><a  onClick={() => navigate('/auth')}>Kliknij tutaj, aby zalogować</a></h2>
            </div>
        )
    }
    return (
        <div className="home-ant-container">
            <Title level={1} style={{textAlign: 'center', marginBottom: 32}}>
                Witaj {UserData ? UserData.login : "Użytkowniku"}!
            </Title>

            <Row gutter={[24, 24]} justify="center">
                <Col xs={24} md={8}>
                    <Card className="ant-home-card" variant="outlined" style={{whiteSpace: 'pre-line'}}>
                        {loginData ? loginData : "Ładowanie..."}
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    {isLoading ? (
                        <Card className="ant-home-card" variant="outlined">
                            <strong>Ładowanie kont...</strong>
                        </Card>
                    ) : AccountData && AccountData.length > 0 ? (
                        AccountData.map(account => (
                            <Card
                                key={account.number} className="ant-home-card" variant="outlined"
                                onClick={() => navigate(`/account/${account.number}`)}
                                style={{cursor: 'pointer'}}>
                                <p><strong>name:</strong> {account.name}</p>
                                <p><strong>balance:</strong> {account.balance} {account.currency}</p>
                                <p><strong>Type:</strong> {account.type}</p>
                            </Card>
                        ))
                    ) : (
                        <Card className="ant-home-card" variant="outlined">
                            <strong>Nie znaleziono kont</strong>
                        </Card>
                    )}
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