import type {Accounts} from "../models/Accounts.ts";
import {api} from "../axios.ts";

export const fetchAccounts= async (): Promise<Accounts[]> =>{
    try {
        const response = await api.get(`/Account/all`);
        return await response.data;
    } catch (error: any) {
        throw new Error(error.message || "Wystąpił błąd podczas pobierania kont");
    }
}

export const fetchAccountDetails = async (accountId: string): Promise<Accounts> => {
    try {
        const response = await api.get(`/Account/details`, {
            params: {
                id: accountId
            }
        });
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

