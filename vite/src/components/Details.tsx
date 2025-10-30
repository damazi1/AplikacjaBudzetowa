import React, { useEffect, useState } from "react";
    import {Alert, Button, Card, Col, Form, Input, Layout, message, Modal, Radio, Row, Select} from "antd";
    import {deleteUser, fetchUserId, fetchUsers, registerUser, searchUsers} from "../services/userService.ts";
import {createAccount} from "../services/accountService.ts";

const { Content } = Layout;

    const Details: React.FC = () => {
        const [user, setUser] = useState<any>(null);
        const [error, setError] = useState<string>("");
        const [isModalOpen, setIsModalOpen] = useState(false);

        const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
        const [userOptions, setUserOptions] = useState<{value: string, label: string}[]>([]);
        const [searchLoading, setSearchLoading] = useState(false);
        const [, setFoundUsers] = useState<any[]>([]);
        const [currencyOptions, setCurrencyOptions] = useState<{ value: string; label: string }[]>([]);

        const [loginData, setLogin] = useState<string | null>(null);
        useEffect(() => {
            const fetchLoginData = async () => {
                try {
                    console.log("Fetching users...");
                    const users = await fetchUsers();
                    console.log(users)
                    setLogin(users.join('\n'));
                    } catch (err: any) {
                    message.error(err.response?.data?.error || err.message);
                }
            };
            fetchLoginData();
        }, []);

        const fetchUsersQuery = async (search = "") => {
            try {
                setSearchLoading(true);
                const users = await searchUsers(search); // Teraz users to tablica obiektów
                setFoundUsers(users);
                const options = users.slice(0, 5).map((u: any) => ({
                    value: u.id,
                    label: u.login
                }));
                setUserOptions(options);
                setSearchLoading(false);
            } catch (err: any) {
                setError(err.message);
                setSearchLoading(false);
            }
        };

// Otwieranie modala i pobieranie pierwszych 5 użytkowników:
        const showDeleteModal = () => {
            setIsDeleteModalOpen(true);
            fetchUsersQuery();
        };
        const handleDeleteCancel = () => setIsDeleteModalOpen(false);

        const handleDeleteUser = async (values: any) => {
            try {
                console.log(values);
                await deleteUser(values.userId); // values.login to teraz id użytkownika
                setIsDeleteModalOpen(false);
                // opcjonalnie: odśwież listę, pokaż powiadomienie itp.
            } catch (err: any) {
                setError(err.message);
            }
        };

        const handleSearch = (value: string) => {
            fetchUsersQuery(value);
        };

        const showModal = () => setIsModalOpen(true);
        const handleCancel = () => setIsModalOpen(false);
        const [newUser, setNewUser] = useState<{login: string, role: string} | null>(null);

        const handleAddUser = async (values: any) => {
            try {
                await registerUser(values);
                setIsModalOpen(false);
                setNewUser({ login: values.login, role: values.role });
            } catch (err: any) {
                setError(err.message);
            }
        };
        useEffect(() => {
            const fetchUser = async () => {
                try {
                    const user = await fetchUserId();
                    setUser(user);
                } catch (err: any) {
                    setError(err.response?.data?.error || err.message);
                }
            };
            fetchUser();
        }, []);

        const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
        const showAccountModal = () => setIsAccountModalOpen(true);
        const handleAccountCancel = () => setIsAccountModalOpen(false);

        const handleAddAccount = async (values: any) => {
            try {
                // Dodaj userId z aktualnego użytkownika
                await createAccount({ ...values, userId: user.id });
                setIsAccountModalOpen(false);
            } catch (err: any) {
                setError(err.message);
            }
        };

        function generateAccountNumber() {
            let number = "";
            for (let i = 0; i < 25; i++) {
                number += Math.floor(Math.random() * 10);
            }
            return number;
        }

        const fetchCurrencyOptions = async () => {
            try {
                const response = await fetch('http://localhost:8080/Account/currency', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });
                if (!response.ok) throw new Error(`HTTP ${response.status}`);

                const data = await response.json();
                console.log('currency payload:', data);

                let opts: { value: string; label: string }[] = [];

                if (Array.isArray(data)) {
                    // backend zwraca bezpośrednio tablicę np. ["USD","EUR",..."]
                    opts = data.map((c: string) => ({value: c, label: c}));
                } else if (data && typeof data === 'object') {
                    // obsłuż strukturę { rates: { USD: ..., EUR: ... } }
                    if (data.rates && typeof data.rates === 'object') {
                        // gdy rates jest obiektem z kluczami walut
                        opts = Object.keys(data.rates).map((code: string) => ({value: code, label: code}));
                    } else {
                        // fallback: zamapuj klucze głównego obiektu
                        opts = Object.keys(data).map((code: string) => ({value: code, label: code}));
                    }
                }
                setCurrencyOptions(opts);
                console.log('currency options:', opts);
            } catch (error) {
                console.error('Error fetching currency data:', error);
                setCurrencyOptions([]);
            }
        };
        useEffect(() => {
            if (isAccountModalOpen) {
                fetchCurrencyOptions();
            }
        }, [isAccountModalOpen]);

        const accountTypeOptions = [
            { value: "SAVINGS", label: "Oszczędnościowe" },
            { value: "CHECKING", label: "Rachunek bieżący" },
            { value: "LOAN", label: "Kredytowe" }
        ];

        return (
            <Content style={{ padding: "20px"}}>
                {error && <Alert type="error" message={error}/>}
                {user && (
                    <div>
                        <h1>Detale konta</h1>
                        <p>Login: {user.login}</p>
                        <Content>
                            <Radio.Group defaultValue="addAccount" style={{ marginBottom: 16 }}>
                                <Radio.Button value="addAccount" onClick={showAccountModal}>Add Account</Radio.Button>
                            </Radio.Group>
                            <Modal
                                title="Utwórz konto"
                                open={isAccountModalOpen}
                                onCancel={handleAccountCancel}
                                footer={null}
                            >
                                <Form layout="vertical" onFinish={handleAddAccount} initialValues={{ number: generateAccountNumber() }}>
                                    <Form.Item label="Nazwa konta" name="name" rules={[{ required: true, message: "Podaj nazwę konta" }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Waluta" name="currency" rules={[{ required: true, message: "Wybierz walutę" }]}>
                                        <Select options={currencyOptions} placeholder="Wybierz walutę" />
                                    </Form.Item>
                                    <Form.Item label="Typ konta" name="type" rules={[{ required: true, message: "Wybierz typ konta" }]}>
                                        <Select options={accountTypeOptions} placeholder="Wybierz typ konta" />
                                    </Form.Item>
                                    <Form.Item label="Numer konta" name="number" rules={[{ required: true, message: "Wygeneruj numer konta" }]}>
                                        <Input
                                            readOnly
                                            addonAfter={
                                                <Button onClick={() => {
                                                    // Ustaw nowe losowe 25-cyfrowe konto
                                                    const form = Form.useFormInstance();
                                                    form.setFieldsValue({ number: generateAccountNumber() });
                                                }} type="primary">Generuj</Button>
                                            }
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">Utwórz konto</Button>
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </Content>
                    </div>
                )}
                {user && user.role === "ADMIN" && (
                    <div>
                        <h2>Rola: {user.role}</h2>
                        <p>To jest dodatkowa informacja dostępna tylko dla administratorów.</p>
                        <Row gutter={32} justify="start">
                            <Col>
                                <Card className="ant-home-card" variant="outlined" style={{whiteSpace: 'pre-line'}}>
                                    {loginData ? loginData : "Ładowanie..."}
                                </Card>
                            </Col>
                            <Col>
                                <Radio.Group defaultValue="addUser" style={{ marginBottom: 16 }}>
                                    <Radio.Button value="addUser" onClick={showModal}>Dodaj użytkownika</Radio.Button>
                                    <Radio.Button value="deleteUser" onClick={showDeleteModal}>Usuń użytkownika</Radio.Button>
                                </Radio.Group>
                            </Col>
                        </Row>

                        <Content>

                            <Modal
                                title="Dodaj użytkownika"
                                open={isModalOpen}
                                onCancel={handleCancel}
                                footer={null}
                            >
                                <Form layout="vertical" onFinish={handleAddUser}>
                                    <Form.Item label="Login" name="login" rules={[{ required: true, message: "Podaj login" }]}>
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="Hasło" name="password" rules={[{ required: true, message: "Podaj hasło" }]}>
                                        <Input.Password />
                                    </Form.Item>
                                    <Form.Item
                                        label="Rola"
                                        name="role"
                                        rules={[{ required: true, message: "Wybierz rolę" }]}
                                    >
                                        <Select placeholder="Wybierz rolę">
                                            <Select.Option value="USER">User</Select.Option>
                                            <Select.Option value="ADMIN">Admin</Select.Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">Dodaj</Button>
                                    </Form.Item>
                                </Form>
                            </Modal>

                            <Modal
                                title="Usuń użytkownika"
                                open={isDeleteModalOpen}
                                onCancel={handleDeleteCancel}
                                footer={null}
                            >
                                <Form layout="vertical" onFinish={handleDeleteUser}>
                                    <Form.Item
                                        label="Wybierz użytkownika"
                                        name="userId"
                                        rules={[{ required: true, message: "Wybierz użytkownika" }]}
                                    >
                                        <Select
                                            showSearch
                                            placeholder="Wyszukaj użytkownika"
                                            filterOption={false}
                                            onSearch={handleSearch}
                                            options={userOptions}
                                            loading={searchLoading}
                                            notFoundContent={searchLoading ? "Ładowanie..." : "Brak wyników"}
                                        />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">Usuń</Button>
                                    </Form.Item>
                                </Form>
                            </Modal>

                            {newUser && (
                                <div style={{ marginTop: 24 }}>
                                    <Alert
                                        type="success"
                                        message={`Dodano użytkownika: ${newUser.login} (${newUser.role})`}
                                        showIcon
                                    />
                                </div>
                            )}
                        </Content>
                    </div>
                )}
            </Content>
        );
    };

export default Details;