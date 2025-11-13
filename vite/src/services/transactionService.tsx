import type {Transaction} from "@models/Transactions"
import {api} from "../axios.ts";


export const fetchTransactions = async (id: number): Promise<Transaction[]> => {
    try {
        const response = await api.get(`/Transaction/get/${id}`);
        return await response.data;
    } catch (error:any) {
        throw new Error(error.message || "Wystąpił błąd podczas pobierania transakcji");
    }

}

export type newPaymentPayload = {
    accountNumber: number;
    amount: number;
    description: string;
}

export const newPayment = async (data: newPaymentPayload): Promise<void> => {
    try {
        await api.post(`http://localhost:8080/Transaction/create/deposit`, data);
    } catch (error: any) {
        throw new Error(error.message || "Wystąpił błąd podczas realizacji płatności");
    }
}