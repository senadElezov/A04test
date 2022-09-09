import axios, { AxiosRequestConfig } from "axios";
import { useCallback, useContext } from "react";
import { toast } from "react-semantic-toasts";
import { IRemoteParams } from "./Interfaces/IRemoteParams";


const useRemove = () => {


    const remove = useCallback(async (params: { url: string, config: AxiosRequestConfig } & IRemoteParams) => {

        const { config, url, errorMessage, showDisplayMessages, successMessage } = params;

        try {
            const result = await axios.delete(url, config);

            if (!showDisplayMessages) {
                return result;
            }

            const message = typeof successMessage === 'string' ? successMessage : successMessage(result);

            toast({
                type: 'info',
                title: message
            })

        }
        catch (error) {

            if (!showDisplayMessages) {
                throw error
            }

            const message = typeof errorMessage === 'string' ? errorMessage : errorMessage(error);

            toast({
                type: 'warning',
                title: message,
                size:'small'
            })
        }

    },
        []
    )

    return remove;
}

export default useRemove;