import React, {useState} from "react";
import {Button, Checkbox, Form, type FormProps, Input, message} from "antd";
import {Trans, useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {loginUser} from "@services/userService.tsx";

type LoginFormProps = {
    username?: string;
    password?: string;
    remember?: string;
};

export function AuthorizationLoginForm() {
    const [isFormFilled, setIsFormFilled] = useState(false);
    const {t} = useTranslation();
    const navigate = useNavigate();
    const onFieldsChange = (_: any, allFields: any[]) => {
        const username = allFields.find(f => f.name[0] === 'username')?.value;
        const password = allFields.find(f => f.name[0] === 'password')?.value;
        const isValid = !!username && !!password && username.length >= 5 && password.length >= 5;
        setIsFormFilled(isValid);
    };

    const onFinish: FormProps<LoginFormProps>['onFinish'] = async (values) => {
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
            <Form.Item<LoginFormProps>
                label={t("Username")}
                name="username"

                rules={[
                    { required: true, message: t('Please input your login!') },
                    { min: 5, message: t('Login must be at least 5 characters long!') }
                ]}                >
                <Input placeholder={t("Enter your login")} />
            </Form.Item>

            <Form.Item<LoginFormProps>
                label={t("Password")}
                name="password"
                rules={[
                    { required: true, message: t("Please input your password!") },
                    { min: 5, message: t('Password is too short!') }
                ]}                >
                <Input.Password placeholder={t("Enter your password")}/>
            </Form.Item>

            <Form.Item<LoginFormProps> name="remember" valuePropName="checked" label={null}>
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
    )
}