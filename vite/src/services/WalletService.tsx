import type {Wallet} from "../models/Wallet.ts";
import { api } from "../axios.ts";
export const addWallet = async (data: {name: string, currency: string, balance: number}) => {
    try {
        const response = await api.post(`/wallet/add`, data);
        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
}

export const fetchWallets = async () => {
    try {
        const response = await api.get(`/wallet/`);
        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
}

export const getWalletById = async (id: string): Promise<Wallet> => {
    try {
        const response = await api.get(`/wallet/${id}`)
        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
};

export type payloadNewTransaction = {
    amount: number;
    description?: string;
    category: string;
}

export const newWalletTransaction = async (data: payloadNewTransaction, id: String)=>{
    try {
        const response = await api.post(`/Transaction/wallet/newTransaction?walletId=${id}`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateWalletTransaction = async (data: {id: string; amount: number; description?: string; category: string;})=>{
    try {
        const response = await api.put(`/Transaction/wallet/updateTransaction`, data);
        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
}

export type payloadPeriodTransaction = {
    walletId: string;
    startDate: string;
    endDate: string;
}
export const periodWalletTransaction = async(data: payloadPeriodTransaction) => {
    try {
        const response = await api.get(`/Transaction/wallet/periodTransactions`, {
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

export const periodWalletBalance = async(data: payloadPeriodTransaction) => {
   try {

       const response = await api.get(`/Transaction/wallet/totalPeriodBalance`, {
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

export const deleteWalletById = async (id: string): Promise<void> => {
    try {
        await api.delete(`/Transaction/wallet/deleteTransaction`, {
            params: {
                id: id,
            },
        });
    } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Unknown error");}
}