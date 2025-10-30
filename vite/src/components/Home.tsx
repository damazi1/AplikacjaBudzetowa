import {Row, Col, Typography, Card, message, Button, Space, Modal, Form, Input, Select} from 'antd';
import '../styles/Home.css';
import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import type {Accounts} from "../models/Accounts.ts";
const { Title } = Typography;
import { fetchAccounts } from "../services/accountService"; // popraw ścieżkę jeśli inna
import { fetchUserId } from "../services/userService.ts"; // popraw ścieżkę jeśli inna
import type { User } from "../models/User.ts";
import {addWallet} from "../services/WalletServiice.tsx"; // popraw ścieżkę jeśli inna

const Home: React.FC = () => {
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
        if (localStorage.getItem('loginSuccess')) {
            message.success('Login successful');
            localStorage.removeItem('loginSuccess');
        }
    }, []);

    useEffect(() => {
            const fetchAccountData = async () => {
                try {
                    const accounts = await fetchAccounts();
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

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formType, setFormType] = useState<'wallet' | 'account'>('wallet');
    const [form] = Form.useForm();

    const openForm = (type: 'wallet' | 'account') => {
        setFormType(type);
        setIsFormOpen(true);
    };
    const closeForm = () => {
        setIsFormOpen(false);
        form.resetFields();
    };

    const onSubmit = async (values: any) => {
        try {
            if (formType === 'wallet')
                await addWallet(values)
            message.success('Zapisano');
            closeForm();
        } catch (e: any) {
            message.error(e.message || 'Błąd zapisu');
        }
    };

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

            <Row>
                <Col offset={4}>
                    <h1>Portfele</h1>
                </Col>
            </Row>
            <Row>

                <Col xs={24} md={16} offset={4}>
                    <Space direction={"vertical"}>
                        <Button style={{background: "green", width: "250px"}} type={"primary"} onClick={() => openForm('wallet')}>Utwórz nowy portfel </Button>
                        <Button style={{background: "green", width: "250px"}} type={"primary"} onClick={() => openForm('account')}>Utwórz nowe konto  </Button>
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col offset={4} style={{marginTop: '20px'}}>
                    <h1>Twoje konta</h1>
                </Col>
            </Row>
            <Row>
                <Col xs={24} md={16} offset={4}>
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
            </Row>

            {/* Modal z formularzem na tej samej stronie */}
            <Modal
                title={formType === 'wallet' ? 'Nowy portfel' : 'Nowe konto'}
                open={isFormOpen}
                onCancel={closeForm}
                onOk={() => form.submit()}
                okText="Zapisz"
                cancelText="Anuluj"
                destroyOnClose
            >
                <Form form={form} layout="vertical" onFinish={onSubmit} preserve={false}>
                    <Form.Item
                        name="name"
                        label="Nazwa"
                        rules={[{ required: true, message: 'Podaj nazwę' }]}
                    >
                        <Input placeholder="np. Mój portfel" />
                    </Form.Item>

                    {formType === 'account' && (
                        <Form.Item
                            name="type"
                            label="Typ konta"
                            rules={[{ required: true, message: 'Wybierz typ konta' }]}
                        >
                            <Select
                                placeholder="Wybierz typ"
                                options={[
                                    { value: 'SAVINGS', label: 'Oszczędnościowe' },
                                    { value: 'CHECKING', label: 'Bieżące' },
                                ]}
                            />
                        </Form.Item>
                    )}

                    <Form.Item
                        name="currency"
                        label="Waluta"
                        rules={[{ required: true, message: 'Wybierz walutę' }]}
                    >
                        <Select
                            placeholder="Wybierz walutę"
                            options={[
                                { value: 'PLN', label: 'PLN' },
                                { value: 'USD', label: 'USD' },
                                { value: 'EUR', label: 'EUR' },
                            ]}
                        />
                    </Form.Item>
                </Form>
            </Modal>

        </div>
    );
}

export default Home;