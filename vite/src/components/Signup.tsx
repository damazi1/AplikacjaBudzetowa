// Cały komponent Auth jest z dokumentacji Ant Design https://ant.design/components/form

import React from 'react';
import type { FormProps } from 'antd';
import '../styles/Auth.css'; // Import CSS for styling
import { Button, Form, Input, message } from 'antd';
import {loginUser} from "@services/userService.tsx";
import {useState} from "react";
import {Trans, useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
type FieldType = {
    login?: string;
    password?: string;
    remember?: string;
};

const Auth: React.FC = () => {

    const [isFormFilled, setIsFormFilled] = useState(false);
    const {t} = useTranslation();
    const navigate = useNavigate();
    const onFieldsChange = (_: any, allFields: any[]) => {
        const login = allFields.find(f => f.name[0] === 'login')?.value;
        const password = allFields.find(f => f.name[0] === 'password')?.value;
        const isValid = !!login && !!password && login.length >= 5 && password.length >= 5;
        setIsFormFilled(isValid);
    };

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            await loginUser(values.login, values.password);
            localStorage.setItem('loginSuccess', 'true');
            window.location.href="/"; // przekierowanie do strony głównej
        } catch (error) {
            message.error(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };
    return (
        <div className="ant-Auth-form-bg">
            <Form
                name="basic"
                labelCol={{span: 24}}
                wrapperCol={{span: 24}}
                style={{maxWidth: 600}}
                initialValues={{remember: true}}
                onFinish={onFinish}
                autoComplete="off"
                onFieldsChange={onFieldsChange}
            >
                <div className="ant-Auth-form-header">
                    <h2>
                        <Trans i18nKey="registerMessage">
                            <strong>Login</strong> to E-Wallet
                        </Trans>
                    </h2>
                    <p>{t("Have an account?")}<a onClick={() => navigate("/auth/login")}> {t("Login here")}!</a></p>
                </div>
                {/* ...pozostałe pola formularza... */}
                <Form.Item<FieldType>
                    label={t("Username")}
                    name="login"

                    rules={[
                        { required: true, message: 'Please input your login!' },
                        { min: 5, message: 'Login must be at least 5 characters long!' }
                    ]}                >
                    <Input placeholder={t("Enter your login")} />
                </Form.Item>

                <Form.Item<FieldType>
                    label={t("Password")}
                    name="password"
                    rules={[
                        { required: true, message: t("Please input your password!") },
                        { min: 5, message: t('Password is too short!') }
                    ]}                >
                    <Input.Password placeholder={t("Enter your password")}/>
                </Form.Item>

                <Form.Item<FieldType>
                    label={t("Confirm Password")}
                    name="password"
                    rules={[
                        { required: true, message: t("Please input your password!") },
                        { min: 5, message: t('Password is too short!') }
                    ]}                >
                    <Input.Password placeholder={t("Enter your password")}/>
                </Form.Item>

                <Form.Item label={null} wrapperCol={{span: 24}}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={!isFormFilled}
                        style={{ width: "100%" }}
                    >        <Trans i18nKey="registerMessage"></Trans>
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
        ;
};

export default Auth;