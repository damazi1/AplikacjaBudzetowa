import axios from "axios";
import type {Wallet} from "../models/Wallet.ts";

export const addWallet = async (data: {name: string, currency: string, balance: number}) => {
    try {
        const response = axios.post(`http://localhost:8080/wallet/add`, data , {
        withCredentials: true,
        headers: {'Content-Type': 'application/json'}
    });
        return response;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
}

export const fetchWallets = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/wallet/`, {
            withCredentials: true,
            headers: {'Content-Type': 'application/json'}
        });
        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
}

export const getWalletById = async (id: string): Promise<Wallet> => {
    const url = `http://localhost:8080/wallet/${id}`;
    const response = await axios.get<Wallet>(url, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
    });
    return response.data;
};