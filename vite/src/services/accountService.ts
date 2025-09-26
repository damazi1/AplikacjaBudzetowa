import type {Accounts} from "../models/Accounts.ts";
import axios from "axios";
import {fetchUserId} from "./userService.ts";

export const fetchAccounts= async (): Promise<Accounts[]> =>{
    const id = await fetchUserId();
    try {
        const response = await axios.get(`http://localhost:8080/Account/get/${id.id}`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.data;
    } catch (error: any) {
        throw new Error(error.message || "Wystąpił błąd podczas pobierania kont");
    }
}

export const fetchAccountDetails = async (account: string): Promise<Accounts> => {
    try {
        const response = await axios.get(`http://localhost:8080/Account/details/${account}`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.message || "Wystąpił błąd podczas pobierania szczegółów konta");
    }
}

export const createAccount = async (payload: Accounts): Promise<void> => {
    try {
        await axios.post(`http://localhost:8080/Account/create`, payload, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error: any) {
        throw new Error(error.message || "Wystąpił błąd podczas tworzenia konta");
    }
}

