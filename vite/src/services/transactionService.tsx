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

type walletToPieChartPayload = {
    id: string;
    from: string;
    to: string;
}

export const fetchWalletTransactionsToPieChart = async ( data: walletToPieChartPayload, operator: string): Promise<any> => {
    try {
        const response = await api.post(`/Transaction/wallet/pieChartData`,data, {
            params: {
                operator: operator
            }
        });
        return response.data;
    } catch (error:any) {
        throw new Error(error.message || "Wystąpił błąd podczas pobierania transakcji do wykresu kołowego");
    }
}

export const fetchWalletTransactionsToBarChart = async ( data: walletToPieChartPayload): Promise<any> => {
    try {
        const response = await api.post(`/Transaction/wallet/barChartData`,data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.message || "Wystąpił błąd podczas pobierania transakcji do wykresu słupkowego");
    }
}

export const fetchWalletTransactionsToLineChart = async ( data: walletToPieChartPayload): Promise<any> => {
    try {
        const response = await api.post(`/Transaction/wallet/lineChartData`,data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.message || "Wystąpił błąd podczas pobierania transakcji do wykresu liniowego");
    }
}

export const fetchAccountTransactionsToBarChart = async ( data: walletToPieChartPayload): Promise<any> => {
    try {
        const response = await api.post(`/Transaction/account/barChartData`,data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.message || "Wystąpił błąd podczas pobierania transakcji do wykresu słupkowego");
    }
}

export const fetchAccountTransactionsToLineChart = async ( data: walletToPieChartPayload): Promise<any> => {
    try {
        const response = await api.post(`/Transaction/account/lineChartData`,data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.message || "Wystąpił błąd podczas pobierania transakcji do wykresu liniowego");
    }
}

export const fetchAllTransactionsToBarChart = async ( data: {from: string; to: string}): Promise<any> => {
    try {
        const response = await api.post(`/Transaction/all/barChartData`, data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.message || "Wystąpił błąd podczas pobierania transakcji do wykresu słupkowego");
    }
}


export const fetchAllTransactionsToLineChart = async ( data: {from: string; to: string}): Promise<any> => {
    try {
        const response = await api.post(`/Transaction/all/lineChartData`, data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.message || "Wystąpił błąd podczas pobierania transakcji do wykresu słupkowego");
    }
}
