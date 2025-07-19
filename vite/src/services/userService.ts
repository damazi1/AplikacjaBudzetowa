import axios from "axios";

const token = localStorage.getItem('jwt');
const url = 'http://localhost:8080/User';
export const fetchUsers = async (): Promise<string[]> => {
    try {
        const response = await axios.get(`${url}/list`);
        return response.data.map((user: { login: string }) => user.login);
    } catch (error: any) {
        throw new Error(error.response?.data?.error || error.message);
    }
}
export const fetchUserDetails = async (login: string): Promise<any> => {
    try {
        const response = await axios.get(
            `${url}/details/${login}`,
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
        const response = await axios.get(`${url}/getId/${login}`, {
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

export const loginUser = async (login: string | undefined, password: string | undefined): Promise<void> => {
    try {
        const response = await axios.post(`${url}/login`, { login, password }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.data.error){
            throw new Error(response.data.error);
        }
        if (!response.data || !response.data.token) {
            throw new Error(response.data.error);
        }
        localStorage.setItem('jwt', response.data.token);
        localStorage.setItem('login', login!.toString());
        localStorage.setItem('role', response.data.role);
    } catch (error: any) {
        throw new Error(error.response?.data?.error || error.message);
    }
}
