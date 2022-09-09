import axios, { AxiosRequestConfig } from "axios"
import { useCallback, useContext } from "react"
import { toast } from "react-semantic-toasts";
import { IRemoteParams } from "./usePost";



const usePut = () => {
    
    const put = useCallback(async <Response extends any = any>(params: { url?: string, data?: any, config?: AxiosRequestConfig } & IRemoteParams<Response>) => {

        const { config, data, url, errorMessage, showDisplayMessages, successMessage } = params;

        try {
            const response = await axios.put<Response>(url, data, config)

            if (!showDisplayMessages) {
                return response;
            }

            const message = typeof successMessage === 'string' ? successMessage : successMessage(response.data);

            toast({
                title: message,
                type: 'info',
                size: 'small',
                
            })
        }
        catch (error) {
            if (!showDisplayMessages) {
                throw error
            }

            const message = typeof errorMessage === 'string' ? errorMessage : errorMessage(error);

            toast({
                title: message,
                type: 'warning',
                size: 'small',
                icon: 'warning',
                color:'red'
            })

            throw error;
        }

    },
        []
    )

    return put;
}

export default usePut