import { useCallback } from "react";
import { IDBFilter } from "../../apis/Interfaces/IDBFilter";
import { IDBSort } from "../../apis/Interfaces/IDBSort";


export interface ILoadOptions {

    skip?: number,

    take?: number,

    filter?: IDBFilter,

    sort?: IDBSort

    searchValue?: any
}

export interface ISelectBoxDataSource {

    load: (loadOptions: ILoadOptions) => Promise<any>

    byKey: (key: any) => Promise<any>

}

export interface ISelectBoxDataSourceParams {

}


const useSelectBoxDataSource = (params: ISelectBoxDataSourceParams): ISelectBoxDataSource => {

    const load = useCallback(async (loadOptions: ILoadOptions) => {

    },
        []
    )

    const byKey = useCallback(async (key: any) => {

    },
        []
    )


    return {
        byKey,
        load
    }
}

export default useSelectBoxDataSource;