import { useCallback } from "react";
import useABookCRUDEndpoint from "../../../../../apis/CRUD/useABookCRUDEndpoint";
import useAsyncState from "../../../useAsyncState";

import { IEntityDataSource } from "./SelectBox";

export interface IGetSelectBoxDataSourceParams {

    entityDataSource: IEntityDataSource

    searchValue?: string,

}

const useGetSelectBoxDataSource = (params: IGetSelectBoxDataSourceParams) => {

    const { entityDataSource, searchValue } = params;

    const { entity, filter } = entityDataSource

    const {
        remoteReadMany
    } = useABookCRUDEndpoint();

    const fetchEntitySource = useCallback(async () => {
        const result = await remoteReadMany({
            entity,
            filter,
        });
        return result;
    },
        [remoteReadMany]
    )

    const {
        state: editorData,
        status: dataStatus,
        refresh: refreshEditorSource,
        error
    } = useAsyncState<any[]>({
        asyncFunction: fetchEntitySource,
        cancelFetch: true,
        dependencyArray: [
            searchValue,
            entity,
            filter
        ],
    });

    return {
        editorData,
        dataStatus,
        refreshEditorSource,
        error
    }
}

export default useGetSelectBoxDataSource;