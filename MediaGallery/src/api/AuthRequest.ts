
import axios, { AxiosError } from "axios";
import type { RegisterType } from "../types/UserType";


export const registerRequest = async (data: RegisterType) => {
    try {
        const res = await axios.post("/", data)
        return res;
    } catch (error) {
        if (error instanceof AxiosError && error.message) {
            const backendMessage = error.response?.data?.errors || error.message;
            throw new Error(backendMessage);
        }
        throw new Error("Error desconocito");
    }
}



export const loginRequest = async (data: Omit<RegisterType, "name">) => {
    try {
        const res = await axios.post("/", data)
        return res;
    } catch (error) {
        if (error instanceof AxiosError && error.response) {
            const backendMessage = error.response.data?.errors || error.message;
            throw new Error(backendMessage);
        }
        throw new Error("Error desconocito");
    }
}


export const getCurrentUserRequest = async () => {
    const res = await axios.get("/current-user")
    return res
}