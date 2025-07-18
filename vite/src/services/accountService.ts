import type {Account} from "../models/Accounts.ts";
import axios from "axios";
import {fetchUserId} from "./userService.ts";

export const fetchAccounts = async(): Promise<Account[]> => {
    const token = localStorage.getItem('jwt');
    const id = await fetchUserId();
    console.log(id);
    if (!token) {
        throw new Error("Brak tokenu autoryzacji");
    }
    try {
        const response = await axios.get(`http://localhost:8080/Account/get/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data);
        return await response.data;
    } catch (error: any) {
        throw new Error(error.message || "Wystąpił błąd podczas pobierania kont");
    }
}