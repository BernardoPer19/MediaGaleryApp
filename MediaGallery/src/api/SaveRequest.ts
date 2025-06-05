import { AxiosError } from 'axios'
import axios from './axios'
import { toast } from 'sonner'

export const saveRequest = async (data: SaveData) => {
    try {
        const res = await axios.post("/saved", data)
        return res.data
    } catch (error) {
        console.log(error);

        if (error instanceof AxiosError) {
            const backendMessage = error.response?.data?.message || error.message;
            toast.error(backendMessage);
            throw new Error(backendMessage);
        }
        throw new Error("Error desconocido");
    }
}


export const savedRequest = async () => {
    try {
        const res = await axios.get("/saved")
        return res.data
    } catch (error) {
        if (error instanceof AxiosError) {
            const backendMessage = error.response?.data?.message || error.message;
            toast.error(backendMessage);
            throw new Error(backendMessage);
        }
        throw new Error("Error desconocido");
    }
}

export const deleteSaveRequest = async (id: string) => {
    try {
        const res = await axios.delete(`/saved/:${id}`,)
        return res.data
    } catch (error) {
        if (error instanceof AxiosError) {
            const backendMessage = error.response?.data?.message || error.message;
            toast.error(backendMessage);
            throw new Error(backendMessage);
        }
        throw new Error("Error desconocido");
    }
}




