import { createContext, useEffect, useState } from "react";
import { IColumnProps } from "../Column/IColumnProps";

export interface IABookCtxProviderTableProps {

    children?: any

    onColumnsChanged?: (columns: IColumnProps[]) => any

}

export interface IABookTableContext {

    columns?: { [dataField: string]: IColumnProps }

    addColumn?: (column: IColumnProps) => any

}

export const ABookTableCtx = createContext<IABookTableContext>({
})

const ABookTableCtxProvider = (props: IABookCtxProviderTableProps) => {

    const {
        onColumnsChanged
    } = props;

    const [columns, setColumns] = useState<{ [dataField: string]: IColumnProps }>({});

    const addColumn: IABookTableContext['addColumn'] = (column) => {

        setColumns(prevColumns => {

            return {
                ...prevColumns,
                [column.dataField]: column
            }
        })
    }

    useEffect(() => {
        onColumnsChanged(Object.values(columns))
    },
        [onColumnsChanged, columns]
    )

    return <ABookTableCtx.Provider
        value={{
            columns,
            addColumn
        }}>
        {props.children}
    </ABookTableCtx.Provider>
}

export default ABookTableCtxProvider;