import { AxiosError } from 'axios'
import axios from './axios'
import { toast } from 'sonner'


export const FavoritedRequest = async () => {
    try {
        const res = await axios.get("/favorite")
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

export const deleteFavoriteRequest = async (id: string) => {
    try {
        const res = await axios.delete(`/favorite/:${id}`,)
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




