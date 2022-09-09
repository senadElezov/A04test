import axios, { AxiosResponse } from "axios";
import { useCallback } from "react";
import { ABookAPIModel } from "./APIModels/ABookApiModel";
import { InferredBody, InferredParams, InferredReturns } from "./APIModels/CRUD/tsUtils/InferredAttributes";
import { apis } from "./apis";

export const apiURLS: { [apiName in apis]: string } = {
    abook: 'testUrl',
    auth: 'testUrl'
}

export type HttpMethod = 'post' | 'put' | 'delete' | 'get'

const executeByMethod: { [methodName in HttpMethod]: (url: string, params: any, body: any) => Promise<AxiosResponse> } = {
    delete: async (url, params, body) => {

        const result = await axios.delete(url, { params: params });

        return result
    },
    post: async (url, params, body) => {

        const result = await axios.post(url, body, { params: params });

        return result
    },
    get: async (url, params, body) => {

        const result = await axios.get(url, { params: params });

        return result
    },
    put: async (url, params, body) => {

        const result = await axios.put(url, body, { params: params });

        return result
    }
}

const useABookEndpoints = <Path extends keyof ABookAPIModel>(path: Path) => {

    type PathDefinition = ABookAPIModel[Path]

    const abookURL = apiURLS.abook;

    const executeEndpoint = useCallback(
        async <HttpMethodType extends keyof PathDefinition>
            (
                method: HttpMethodType,
                params: InferredParams<PathDefinition[HttpMethodType]>,
                body: InferredBody<PathDefinition[HttpMethodType]>
            ): Promise<InferredReturns<PathDefinition[HttpMethodType]>> => {


            const axiosMethod = executeByMethod[method as HttpMethod];

            if (!axiosMethod) {
                return;
            }

            const url = abookURL + '/' + path;

            try {
                const response = await axiosMethod(url, params, body);
                return response.data;

            }
            catch (error) {
                throw error.message
            }

        },

        []
    )

    return executeEndpoint;
}

export default useABookEndpoints;









