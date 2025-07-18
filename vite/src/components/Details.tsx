import React, { useEffect, useState } from "react";
    import { Alert, Layout, Spin } from "antd";
    import { fetchUserDetails } from "../services/userService.ts";
    import { useParams } from "react-router-dom";

    const { Content } = Layout;

    const Details: React.FC = () => {
        const { login } = useParams<{ login: string }>();
        const [userDetails, setUserDetails] = useState<any>(null);
        const [loading, setLoading] = useState<boolean>(true);
        const [error, setError] = useState<string>("");
        const role = localStorage.getItem("role");

        useEffect(() => {
            setError(""); // czyści komunikat błędu
            setUserDetails(null); // czyści dane użytkownika
            setLoading(true); // ustawia ładowanie

            const currentLogin = localStorage.getItem("login");
            if (!currentLogin) {
                setError("Musisz być zalogowany, aby zobaczyć szczegóły konta.");
                setLoading(false);
                return;
            }
            if(login !== currentLogin){
                setError("Nie masz uprawnień do przeglądania tego konta.");
                setLoading(false);
                return;
            }
            fetchUserDetails(login)
                .then(data => setUserDetails(data))
                .catch(err => setError(err.message))
                .finally(() => setLoading(false));
        }, [login]);

        return (
            <Content style={{color: "#fff", padding: "20px"}}>
                {loading && <Spin/>}
                {error && <Alert type="error" message={error}/>}
                {userDetails && (
                    <div>
                        <h1>Detale konta</h1>
                        <p>Login: {userDetails.login}</p>
                    </div>
                )}
                {role === "ADMIN" && (
                    <div>
                        <h2>Rola: {role}</h2>
                        <p>To jest dodatkowa informacja dostępna tylko dla administratorów.</p>
                    </div>
                )}
            </Content>
        );
    };

export default Details;