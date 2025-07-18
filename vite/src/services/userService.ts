import axios from "axios";

export const fetchUsers = async (): Promise<string[]> => {
    try {
        const response = await axios.get('http://localhost:8080/list');
        return response.data.map((user: { username: string }) => user.username);
    } catch (error: any) {
        throw new Error(error.response?.data?.error || error.message);
    }
}