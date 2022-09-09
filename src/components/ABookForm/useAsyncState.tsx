import { useEffect } from "react"
import { useState } from "react"


export type AsyncStatus = 'fetching' | 'fetched' | 'error' | 'notstarted'
export type AsyncState<StateModel> = { state: StateModel, status: AsyncStatus, refresh: () => Promise<any>, error: Error }


export interface IAsyncStateParams<StateModel extends any = any> {

    asyncFunction: () => Promise<StateModel>

    dependencyArray: any[]

    cancelFetch: boolean
}

const useAsyncState = <StateModel extends any>(params: IAsyncStateParams<StateModel>): AsyncState<StateModel> => {

    const [state, setState] = useState<StateModel>();
    const [status, setStatus] = useState<AsyncStatus>('notstarted');

    const [error, setError] = useState<Error>(null);

    const { asyncFunction, dependencyArray } = params;

    const setAsync = async () => {
        setStatus('fetching')

        try {
            const result = await asyncFunction();
            setState(result);
            setError(null);

        }
        catch (error) {
            setStatus('error')
            setError(error);
        }

        setStatus('fetched')
    }

    useEffect(() => {
        if (params.cancelFetch === true || !asyncFunction) {
            return;
        }

        setAsync();
    },
        [asyncFunction, ...(dependencyArray || [])]
    )

    const refresh = async () => {
        await setAsync();
    }

    return {
        state,
        status,
        refresh,
        error
    }
}

export default useAsyncState