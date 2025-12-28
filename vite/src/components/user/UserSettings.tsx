import React, {useState, type ChangeEvent, useEffect} from "react";
import {Col, Input, Row, Button, message} from "antd";
import "@styles/User.css";
import {fetchUserId, updateUser} from "@services/userService.tsx";
import {useTranslation} from "react-i18next";

type UserSettingsData = {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    city?: string;
    houseNumber?: string;
    street?: string;
    postalCode?: string;
};

type UserSettingsProps = {
    initial?: UserSettingsData;
};

export function UserSettings({ initial}: UserSettingsProps) {
    const {t} = useTranslation();
    useEffect(() => {
        const load = async () => {
            try {
                const user = await fetchUserId();
                setFormData({
                    firstName: user?.firstName ?? "",
                    lastName: user?.lastName ?? "",
                    email: user?.email ?? "",
                    phoneNumber: user?.phoneNumber ?? "",
                    city: user?.city ?? "",
                    houseNumber: user?.houseNumber ?? "",
                    street: user?.street ?? "",
                    postalCode: user?.postalCode ?? ""
                });
            } catch (e) {
                console.error("Błąd pobierania użytkownika:", e);
            }
        };
        load();
    }, []);
    const [formData, setFormData] = useState<UserSettingsData>({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        city: "",
        houseNumber: "",
        street: "",
        postalCode: "",
        ...initial,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(f => ({ ...f, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            await updateUser(formData);
            message.success("Ustawienia zostały zaktualizowane.");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Row gutter={[25, 25]}>
            <Col span={24}>
                <h1>{t("Profile details")}</h1>
            </Col>

            <Col span={12}>
                <div className={"field-container"}>
                    <label htmlFor="firstName" className={"label-style"}>{t("First name")}:</label>
                    <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={"input-style"}
                    />
                </div>
            </Col>

            <Col span={12}>
                <div className={"field-container"}>
                    <label htmlFor="lastName" className={"label-style"}>{t("Last name")}:</label>
                    <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={"input-style"}
                    />
                </div>
            </Col>

            <Col span={12}>
                <div className={"field-container"}>
                    <label htmlFor="email" className={"label-style"}>{t("Email")}:</label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={"input-style"}
                    />
                </div>
            </Col>

            <Col span={12}>
                <div className={"field-container"}>
                    <label htmlFor="phoneNumber" className={"label-style"}>{t("Phone number")}:</label>
                    <Input
                        id="phoneNumber"
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className={"input-style"}
                    />
                </div>
            </Col>

            <Col span={7}>
                <div className={"field-container"}>
                    <label htmlFor="city" className={"label-style"}>{t("City")}:</label>
                    <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={"input-style"}
                    />
                </div>
            </Col>

            <Col span={7}>
                <div className={"field-container"}>
                    <label htmlFor="street" className={"label-style"}>{t("Street")}:</label>
                    <Input
                        id="street"
                        name="street"
                        value={formData.street}
                        onChange={handleChange}
                        className={"input-style"}
                    />
                </div>
            </Col>

            <Col span={5}>
                <div className={"field-container"}>
                    <label htmlFor="houseNumber" className={"label-style"}>{t("House number")}:</label>
                    <Input
                        id="houseNumber"
                        name="houseNumber"
                        value={formData.houseNumber}
                        onChange={handleChange}
                        className={"input-style"}
                    />
                </div>
            </Col>



            <Col span={5}>
                <div className={"field-container"}>
                    <label htmlFor="postalCode" className={"label-style"}>{t("Postal code")}:</label>
                    <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className={"input-style"}
                    />
                </div>
            </Col>

            <Col span={24} style={{ marginTop: 20 }}>
                <Button type="primary" onClick={handleSubmit}>{t("Save changes")}</Button>
            </Col>
        </Row>
    );
}