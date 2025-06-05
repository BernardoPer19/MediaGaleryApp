
import { AxiosError } from "axios";
import type { RegisterType } from "../types/UserType";
import axios from './axios'
import { toast } from "sonner";

export const registerRequest = async (data: RegisterType) => {
    try {
        const res = await axios.post("/register", data)
        console.log(res);

        return res.data;
    } catch (error) {
        console.log(error);

        if (error instanceof AxiosError && error.message) {

            const backendMessage = error.response?.data?.message || error.message;
            toast.error(backendMessage);
            throw new Error(backendMessage);
        }
        throw new Error("Error desconocito");
    }
}

export const logoutRequest = async () => {
    try {
        const res = await axios.post("/logout");
        return res.data;
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError && error.response) {
            const backendMessage = error.response.data?.message || error.message;
            toast.error(backendMessage);
            throw new Error(backendMessage);
        }
        throw new Error("Error desconocito");
    }
}


export const loginRequest = async (data: Omit<RegisterType, "name">) => {
    try {
        const res = await axios.post("/login", data)
        return res.data;
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError && error.response) {
            const backendMessage = error.response.data?.message || error.message;
            toast.error(backendMessage);
            throw new Error(backendMessage);
        }
        throw new Error("Error desconocito");
    }
}


export const getCurrentUserRequest = async () => {
    try {
        const res = await axios.get("/current-user")
        return res
    } catch (error) {
        console.log(error);
        if (error instanceof AxiosError && error.response) {
            const backendMessage = error.response.data?.message || error.message;
            toast.error(backendMessage);
            throw new Error(backendMessage);
        }
        throw new Error("Error desconocito");
    }
}