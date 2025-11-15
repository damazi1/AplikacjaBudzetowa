import {api} from "../axios.ts";

export const currencies = async (): Promise<{ value: string; label: string }[]> => {
    try {
        const response = await api.get<string[] | Record<string, any>>(
            `/common/currency`);

        const data = response.data;
        let opts: { value: string; label: string }[] = [];

        if (Array.isArray(data)) {
            opts = data.map((c) => ({ value: c, label: c }));
        } else if (data && typeof data === "object") {
            if (data.rates && typeof data.rates === "object") {
                opts = Object.keys(data.rates).map((code) => ({ value: code, label: code }));
            } else {
                opts = Object.keys(data).map((code) => ({ value: code, label: code }));
            }
        }

        return opts;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
};