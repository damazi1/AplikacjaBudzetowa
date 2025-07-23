import type {Transaction} from "../models/Transactions.ts";
import axios from "axios";


export const fetchTransactions = async (id: number): Promise<Transaction[]> => {
    const token = localStorage.getItem('jwt');

    if(!token){
        throw new Error("Brak tokenu autoryzacji");
    }
    try {
        const response = await axios.get(`http://localhost:8080/Transaction/get/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return await response.data;
    } catch (error:any) {
        throw new Error(error.message || "Wystąpił błąd podczas pobierania transakcji");
    }

}