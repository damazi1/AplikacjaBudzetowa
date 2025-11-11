import axios from "axios";
import type {Wallet} from "../models/Wallet.ts";
import type {Dayjs} from "dayjs";

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

export type payloadNewTransaction = {
    amount: number;
    description?: string;
    category: string;
}

export const newWalletTransaction = async (data: payloadNewTransaction, id: String)=>{
    try {
        const response = await axios.post(`http://localhost:8080/Transaction/wallet/newTransaction?walletId=${id}`, data , {
            withCredentials: true,
            headers: {'Content-Type': 'application/json'}
        });
        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
}

export type payloadPeriodTransaction = {
    walletId: string;
    startDate: Dayjs;
    endDate: Dayjs;
}
export const periodWalletTransaction = async(data: payloadPeriodTransaction) => {
    try {
        const response = await axios.get(`http://localhost:8080/Transaction/wallet/periodTransactions`, {
            withCredentials: true,
            headers: {'Content-Type': 'application/json'},
            params: {
                walletId: data.walletId,
                startDate: data.startDate,
                endDate: data.endDate,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
}