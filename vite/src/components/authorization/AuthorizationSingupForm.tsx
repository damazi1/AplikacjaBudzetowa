import React, {useState} from "react"
import {Trans, useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {Button, Form, type FormProps, Input, message} from "antd";
import {registerUser} from "@services/userService.tsx";

type AuthorizationSingupProps = {
    login?: string;
    password?: string;
    checkPassword?: string;
    remember?: string;
};

export function AuthorizationSingupForm() {
    const [isFormFilled, setIsFormFilled] = useState(false);
    const {t} = useTranslation();
    const navigate = useNavigate();
    const onFieldsChange = (_: any, allFields: any[]) => {
        const login = allFields.find(f => f.name[0] === 'login')?.value;
        const password = allFields.find(f => f.name[0] === 'password')?.value;
        const checkPassword = allFields.find(f => f.name[0] === 'checkPassword')?.value;
        const isValid = !!login && !!password && login.length >= 5 && password.length >= 5 && password === checkPassword;
        setIsFormFilled(isValid);
    };

    const onFinish: FormProps<AuthorizationSingupProps>['onFinish'] = async (values) => {
        try {
            console.log(values);
            await registerUser({username: values.login!, password: values.password!});
            window.location.href="/"; // przekierowanie do strony głównej
        } catch (error) {
            message.error(`Registration failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
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
                    <Trans i18nKey="registerMessage">
                        <strong>Login</strong> to E-Wallet
                    </Trans>
                </h2>
                <p>{t("Have an account?")}<a onClick={() => navigate("/auth/login")}> {t("Login here")}!</a></p>
            </div>
            <Form.Item<AuthorizationSingupProps>
                label={t("Username")}
                name="login"

                rules={[
                    { required: true, message: 'Please input your login!' },
                    { min: 5, message: 'Login must be at least 5 characters long!' }
                ]}                >
                <Input placeholder={t("Enter your login")} />
            </Form.Item>

            <Form.Item<AuthorizationSingupProps>
                label={t("Password")}
                name="password"
                rules={[
                    { required: true, message: t("Please input your password!") },
                    { min: 5, message: t('Password is too short!') }
                ]}                >
                <Input.Password placeholder={t("Enter your password")}/>
            </Form.Item>

            <Form.Item<AuthorizationSingupProps>
                label={t("Confirm Password")}
                name="checkPassword"
                dependencies={['password']}
                rules={[
                    { required: true, message: t("Please input your password again!") },
                    { min: 5, message: t('Password is too short!') },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error(t('Passwords do not match!')));
                        },
                    }),
                ]}             >
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
    )
}