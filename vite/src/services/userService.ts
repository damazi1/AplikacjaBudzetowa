import axios from "axios";

const token = localStorage.getItem('jwt');

export const fetchUsers = async (): Promise<string[]> => {
    try {
        const response = await axios.get('http://localhost:8080/list');
        return response.data.map((user: { login: string }) => user.login);
    } catch (error: any) {
        throw new Error(error.response?.data?.error || error.message);
    }
}
export const fetchUserDetails = async (login: string): Promise<any> => {
    try {
        const response = await axios.get(
            `http://localhost:8080/details/${login}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.error || error.message);
    }
}

export const fetchUserId = async (): Promise<string> => {
    const login = localStorage.getItem('login');
    if (!login) {
        throw new Error("Brak loginu użytkownika");
    }
    try {
        const response = await axios.get(`http://localhost:8080/getId/${login}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.error || error.message);
    }
}