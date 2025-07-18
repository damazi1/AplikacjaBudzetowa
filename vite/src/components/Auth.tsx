// Cały komponent Auth jest z dokumentacji Ant Design https://ant.design/components/form

import React from 'react';
import type { FormProps } from 'antd';
import '../styles/Auth.css'; // Import CSS for styling
import { Button, Checkbox, Form, Input, message } from 'antd';
import {useNavigate} from "react-router-dom";

type FieldType = {
    login?: string;
    password?: string;
    remember?: string;
};

const Auth: React.FC = () => {
    const navigate = useNavigate();

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    login: values.login,
                    password: values.password,
                }),
            });

            const data = await response.json();
            if (response.ok && data.token) {
                localStorage.setItem('jwt', data.token);
                localStorage.setItem('login', values.login as string); // zapisz login
                localStorage.setItem('role', data.role); // zapisz rolę
                message.success('Zalogowano pomyślnie!');
                navigate('/'); // Redirect to home page after successful login
            } else {
                message.error(data.message || 'Błąd logowania');
            }
        } catch (error) {
            message.error('Błąd połączenia z serwerem');
        }
    };
    return (
        <div className="ant-Auth-form-bg">
            <Form
                name="basic"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="login"
                    name="login"
                    rules={[{required: true, message: 'Please input your login!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Auth;