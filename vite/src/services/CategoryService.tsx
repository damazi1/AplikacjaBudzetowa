import axios from "axios";
import type {Category} from "../models/Category";

export const Categories = async ():Promise<Category[]> => {
    try {
        const response = await axios.get<Category[]>("http://localhost:8080/categories/all", {
            withCredentials: true,
            headers: {"Content-Type": "application/json"}
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}