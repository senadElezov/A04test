import axios, { AxiosRequestConfig } from "axios";
import { useContext, useCallback } from "react";
import { toast } from "react-semantic-toasts";

export interface IRemoteParams<Response extends any = any> {

    errorMessage?: ((error: Error) => string) | string

    successMessage?: ((result: Response) => string) | string

    showDisplayMessages?: boolean

}


const usePost = () => {

    const post = useCallback(async <Response extends any = any>(params: { url?: string, data?: any, config?: AxiosRequestConfig } & IRemoteParams<Response>) => {

        const { config, data, url, errorMessage, showDisplayMessages, successMessage } = params;

        try {
            const response = await axios.post<Response>(url, data, config)

            if (!showDisplayMessages) {
                return response;
            }

            const message = typeof successMessage === 'string' ? successMessage : successMessage(response.data);

            toast({
                title: message,
                type: 'info'
            })
        }
        catch (error) {
            if (!showDisplayMessages) {
                throw error
            }

            const message = typeof errorMessage === 'string' ? errorMessage : errorMessage(error);

            toast({
                title: message,
                type: 'warning'
            })

            throw error;
        }

    },
        []
    )

    return post;
}

export default usePost;