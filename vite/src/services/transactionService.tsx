import {api} from "../axios.ts";

type AccountTransactionsPayload = {
    amount: number;
    description?: string;
    date?: Date;
}

export const fetchTransactions = async (id: string): Promise<AccountTransactionsPayload[]> => {
    try {
        const response = await api.get(`/Transaction/account/transactions`, {
            params: {
                id : id
            }
        });
        return await response.data;
    } catch (error:any) {
        throw new Error(error.message || "Wystąpił błąd podczas pobierania transakcji");
    }

}

type newPaymentPayload = {
    accountId: string;
    amount: number;
    description?: string;
}

export const newPayment = async (data: newPaymentPayload): Promise<void> => {
    try {
        const response = await api.post(`/Transaction/account/newTransaction`, data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.message || "Wystąpił błąd podczas realizacji płatności");
    }
}

type newTransferPayload = {
    accountId: string;
    accountToId: string;
    amount: number;
    description?: string;
}
export const newTransfer = async (data: newTransferPayload): Promise<void> => {
    try {
        const response = await api.post(`/Transaction/account/newTransfer`, data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.message || "Wystąpił błąd podczas realizacji przelewu");
    }
}