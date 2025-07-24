import React, { useEffect, useState } from "react";
    import { Alert, Layout } from "antd";
    import { fetchUserId } from "../services/userService.ts";

    const { Content } = Layout;

    const Details: React.FC = () => {
        const [userData, setUserData] = useState<any>(null);
        const [error, setError] = useState<string>("");
        const role = localStorage.getItem("role");

        useEffect(() => {
            const fetchUser = async () => {
                try {
                    const data = await fetchUserId();
                    setUserData(data);
                } catch (err: any) {
                    setError(err.response?.data?.error || err.message);
                }
            };
            fetchUser();
        }, []);

        return (
            <Content style={{ padding: "20px"}}>
                {error && <Alert type="error" message={error}/>}
                {userData && (
                    <div>
                        <h1>Detale konta</h1>
                        <p>Login: {userData.login}</p>
                    </div>
                )}
                {role === "ADMIN" && (
                    <div>
                        <h2>Rola: {userData.role}</h2>
                        <p>To jest dodatkowa informacja dostępna tylko dla administratorów.</p>
                    </div>
                )}
            </Content>
        );
    };

export default Details;