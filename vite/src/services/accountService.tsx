import type {Accounts} from "../models/Accounts.ts";
import {fetchUserId} from "./userService.tsx";
import {api} from "../axios.ts";

export const fetchAccounts= async (): Promise<Accounts[]> =>{
    const id = await fetchUserId();
    try {
        const response = await api.get(`/Account/get/${id.id}`);
        return await response.data;
    } catch (error: any) {
        throw new Error(error.message || "Wystąpił błąd podczas pobierania kont");
    }
}

export const fetchAccountDetails = async (account: string): Promise<Accounts> => {
    try {
        const response = await api.get(`/Account/details/${account}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.message || "Wystąpił błąd podczas pobierania szczegółów konta");
    }
}

type createAccountPayload = {
    name: string;
    currency: string;
    type: string;
}

export const createAccount = async (data: createAccountPayload): Promise<void> => {
    try {
        const response = await api.post(`/Account/create`, data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.message || "Wystąpił błąd podczas tworzenia konta");
    }
}

