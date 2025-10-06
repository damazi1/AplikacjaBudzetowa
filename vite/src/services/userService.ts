import axios from "axios";
import type {User} from "../models/User.ts";

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
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.error || error.message);
    }
}

export const fetchUserId = async (): Promise<User> => {
    try {
        const response = await axios.get(`${url}/me`, {
            withCredentials: true,
            headers: {
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
        const response = await axios.post(`${url}/login`, { login, password },
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true // <-- tutaj, poza headers!
        });
        if(!response.status){
            throw new Error("Nie udało się zalogować. Sprawdź login i hasło.");
        }
        if (response.status === 200) {
            return { success: true };
        }
        return { success: false, message: "Niepoprawne dane logowania!" };
    } catch (error: any) {
        throw new Error(error.response?.data?.error || error.message);
    }
}

export const logoutUser = async (): Promise<void> => {
    try {
        await axios.post(`${url}/logout`, {}, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true // <-- tutaj, poza headers!
        });
    } catch (error: any) {
        throw new Error(error.response?.data?.error || error.message);
    }
}

export const registerUser = async (data : { login: string; password: string; role: string }): Promise<void> => {
    try {
        await axios.post(`${url}/register`, data, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true // <-- tutaj, poza headers!
        });
    } catch (error: any) {
        throw new Error(error.response?.data?.error || error.message);
    }
}

export const searchUsers = async (query: string): Promise<string[]> => {
    try {
        const response = await axios.get(`${url}/search?query=${query}`);
        return response.data.map((user: { id: string, login: string }) => ({
            id: user.id,
            login: user.login
        }));
    } catch (error: any) {
        throw new Error(error.response?.data?.error || error.message);
    }
}

export const deleteUser = async (id: string): Promise<void> => {
    try {
        await axios.delete(`${url}/delete/${id}`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true // <-- tutaj, poza headers!
        });
    } catch (error: any) {
        throw new Error(error.response?.data?.error || error.message);
    }
}
