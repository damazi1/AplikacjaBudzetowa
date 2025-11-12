// Cały komponent Auth jest z dokumentacji Ant Design https://ant.design/components/form

import React, {type FC} from 'react';
import type { FormProps } from 'antd';
import '../styles/Auth.css'; // Import CSS for styling
import { Button, Checkbox, Form, Input, message } from 'antd';
import {loginUser} from "../services/userService.ts";
import {useState} from "react";
import {Trans, useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const Auth: FC = () => {

    const [isFormFilled, setIsFormFilled] = useState(false);
    const {t} = useTranslation();
    const navigate = useNavigate();
    const onFieldsChange = (_: any, allFields: any[]) => {
        const username = allFields.find(f => f.name[0] === 'username')?.value;
        const password = allFields.find(f => f.name[0] === 'password')?.value;
        const isValid = !!username && !!password && username.length >= 5 && password.length >= 5;
        setIsFormFilled(isValid);
    };

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        try {
            console.log(values);
            const result = await loginUser(values.username, values.password);
            console.log(result);
            if (result.success) {
                localStorage.setItem('loginSuccess', 'true');
                window.location.href = "/";
            } else {
                message.error("Niepoprawne dane logowania!");
            }
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
                        <Trans i18nKey="loginMessage">
                            <strong>Login</strong> to E-Wallet
                        </Trans>
                    </h2>
                    <p>{t("Don't have an account yet?")}<a onClick={() => navigate("/auth/signup")}> {t("Sign Up here")}!</a></p>
                </div>
                {/* ...pozostałe pola formularza... */}
                <Form.Item<FieldType>
                    label={t("Username")}
                    name="username"

                    rules={[
                        { required: true, message: t('Please input your login!') },
                        { min: 5, message: t('Login must be at least 5 characters long!') }
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

                <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                    <Checkbox>{t("Remember me")}</Checkbox>
                </Form.Item>

                <Form.Item label={null} wrapperCol={{span: 24}}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={!isFormFilled}
                        style={{ width: "100%" }}
                    >
                        <Trans i18nKey="loginMessage"></Trans>
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
        ;
};

export default Auth;