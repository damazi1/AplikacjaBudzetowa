import type {User} from "../models/User.ts";
import {api} from "../axios.ts";

export const fetchUsers = async (): Promise<string[]> => {
    try {
        const response = await api.get(`/user/`);
        return response.data.map((user: { login: string }) => user.login);
    } catch (error: any) {
        throw new Error(error.response?.data?.error || error.message);
    }
}
export const fetchUserDetails = async (login: string): Promise<any> => {
    try {
        const response = await api.get(
            `user/details/${login}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.error || error.message);
    }
}

export const fetchUserId = async (): Promise<User> => {
    try {
        const response = await api.get(`user/me`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.error || error.message);
    }
}

export const loginUser = async (username: string | undefined, password: string | undefined): Promise<{
    success: boolean
}> => {
    try {
        const response = await api.post(`/auth/login`, { username, password });
        if(!response.status){
            throw new Error("Nie udało się zalogować. Sprawdź login i hasło.");
        }
        if (response.status === 200) {
            return { success: true };
        }
        return { success: false };
    } catch (error: any) {
        throw new Error(error.response?.data?.error || error.message);
    }
}

export const logoutUser = async (): Promise<void> => {
    try {
        await api.post(`/user/logout`);
    } catch (error: any) {
        throw new Error(error.response?.data?.error || error.message);
    }
}

export const registerUser = async (data : { username: string; password: string}): Promise<void> => {
    try {
        await api.post(`/auth/signup`, data);
    } catch (error: any) {
        throw new Error(error.response?.data?.error || error.message);
    }
}

export const searchUsers = async (query: string): Promise<string[]> => {
    try {
        const response = await api.get(`/user/search?query=${query}`);
        return response.data.map((user: { id: string, login: string }) => ({
            id: user.id,
            login: user.login
        }));
    } catch (error: any) {
        throw new Error(error.response?.data?.error || error.message);
    }
}

type userDetails = {
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    city?: string;
    houseNumber?: string;
    street?: string;
    postalCode?: string;
};

export const updateUser = async (data: userDetails)=> {
    try {
        await api.put(`/user/update`, data);
    } catch (error: any) {
        throw new Error(error.response?.data?.error || error.message);
    }
}

export const deleteUser = async (id: string): Promise<void> => {
    try {
        await api.delete(`/user/delete/${id}`);
    } catch (error: any) {
        throw new Error(error.response?.data?.error || error.message);
    }
}
