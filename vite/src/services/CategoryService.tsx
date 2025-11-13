import type {Category} from "../models/Category";
import {api} from "../axios.ts";

export const Categories = async ():Promise<Category[]> => {
    try {
        const response = await api.get<Category[]>("/categories/all");
        return response.data;
    } catch (error) {
        throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
}