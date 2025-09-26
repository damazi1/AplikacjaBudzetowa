import type {Transaction} from "../models/Transactions.ts";
import axios from "axios";


export const fetchTransactions = async (id: number): Promise<Transaction[]> => {
    try {
        const response = await axios.get(`http://localhost:8080/Transaction/get/${id}`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return await response.data;
    } catch (error:any) {
        throw new Error(error.message || "Wystąpił błąd podczas pobierania transakcji");
    }

}
export const newPayment = async (accountNumber: number, amount: number, description: string): Promise<void> => {
    try {
        await axios.post(`http://localhost:8080/Transaction/create/deposit`, {accountNumber, amount, description}, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error: any) {
        throw new Error(error.message || "Wystąpił błąd podczas realizacji płatności");
    }
}