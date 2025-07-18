import {Row, Col, Typography, Card, message} from 'antd';
import '../styles/Home.css';
import React, {useEffect, useState} from 'react';
import {fetchUsers} from "../services/userService.ts";
import {useNavigate} from "react-router-dom";
const { Title } = Typography;

const Home: React.FC = () => {
    const [data, setLogin] = useState<string | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await fetchUsers();
                setLogin(users.join('\n'));
            } catch (err: any) {
                message.error(err.response?.data?.error || err.message);
            }
        };
        fetchData();
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
                        {data ? data : "Ładowanie..."}
                    </Card>
                </Col>
                <Col xs={24} md={8}>
                    <Card className="ant-home-card" variant="outlined">
                        <p>Opis funkcji 2 lub dowolny tekst.</p>
                    </Card>
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