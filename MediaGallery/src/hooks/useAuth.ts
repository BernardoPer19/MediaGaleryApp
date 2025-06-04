import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from 'sonner'
import { loginRequest, registerRequest } from "../api/AuthRequest";

export const useAuth = () => {

    const queryClient = useQueryClient(); // Accede al cliente de consultas

    const handleSuccess = (message: string) => {
        toast.success(message);
    };

    const handleError = (context: string, error: any) => {
        console.error(`❌ Error en ${context}:`, error);

        const message =
            error?.response?.data?.message || error?.message || "Error desconocido";

        toast.error(message);
    };


    const {
        mutate: registerMutate,
        isError: isRegisterError,
        error: registerError,
        isPending: isPedingRegister,
        reset: resetRegister,
    } = useMutation({
        mutationFn: registerRequest,
        onSuccess: (data) => {
            handleSuccess(data.data.message);
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        },
        onError: (error) => {
            handleError("registro", error);
        },
    })



    const {
        mutate: LoginMutate,
        isError: isLoginError,
        error: LoginError,
        isPending: isPedingLogin,
        reset: resetLogin,
    } = useMutation({
        mutationFn: loginRequest,
        onSuccess: (data) => {
            handleSuccess(data.data.message);
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        },
        onError: (error) => {
            handleError("registro", error);
        },
    })


    return {
        register: {
            registerError,
            registerMutate,
            isRegisterError,
            isPedingRegister,
            resetRegister
        },
        login: {
            LoginError,
            LoginMutate,
            isLoginError,
            isPedingLogin,
            resetLogin
        }
    }
}
