import {Row, Col, Typography, Card, message} from 'antd';
import '../styles/Home.css';
import React, {useEffect, useState} from 'react';
import {fetchUsers} from "../services/userService.ts";
const { Title } = Typography;

const Home: React.FC = () => {
    const [data, setUsernames] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const users = await fetchUsers();
                setUsernames(users.join('\n'));
            } catch (err: any) {
                message.error(err.response?.data?.error || err.message);
            }
        };
        fetchData();
    }, []);
    return (
        <div className="home-ant-container">
            <Title level={1} style={{ textAlign: 'center', color: '#fff', marginBottom: 32 }}>
                Witaj na stronie głównej naszego banku!
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