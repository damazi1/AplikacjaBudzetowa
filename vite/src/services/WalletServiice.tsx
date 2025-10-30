import axios from "axios";

export const addWallet = async (data: {name: string, currency: string}) => {
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