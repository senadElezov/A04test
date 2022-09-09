import { ButtonProps } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { Loader, Menu, Pagination, PaginationProps, Table } from "semantic-ui-react";
import useAsyncState from "../ABookForm/useAsyncState";
import Column from "./Components/Column/Column";
import { IColumnProps } from "./Components/Column/IColumnProps";
import ABookTableCtxProvider, { IABookCtxProviderTableProps } from "./Components/CtxProviders/ABookTableCtxProvider";
import TableFilter, { IFilterPart, ITableFilterProps } from "./Components/TableFilter/TableFilter";
import TableRow from "./Components/TableRow";
import useApplyFilter from "./Hooks/useApplyFilter";
import { TableProps } from "semantic-ui-react";
import { ABookAPIModel } from "../../apis/ABookApiModel";
import { InferredParams, InferredBody } from "../../apis/CRUD/tsUtils/InferredAttributes";
import useABookCRUDEndpoint from "../../apis/CRUD/useABookCRUDEndpoint";
import { IEntityDataSource } from "../ABookForm/Components/Editors/SelectBox/SelectBox";

export interface IABookTableProps extends TableProps {

}

export interface IAPIEndpointDataSource<Path extends keyof ABookAPIModel = keyof ABookAPIModel, Method extends keyof ABookAPIModel[Path] = keyof ABookAPIModel[Path]> {

    path?: Path,

    method?: Method

    params?: InferredParams<ABookAPIModel[Path][Method]>

    body?: InferredBody<ABookAPIModel[Path][Method]>
}

export interface ITableProps {

    keyField?: string

    entityDataSource?: IEntityDataSource

    apiEndpointDataSource?: IAPIEndpointDataSource

    children?: any

    editMode?: 'route' | 'popup'

    AddButton?: JSX.Element

    rowActionButtons?: Omit<ButtonProps, 'onClick'> & { onClick?: (key: string, rowData, refresh: () => any) => any }[]

    pagination?: PaginationProps

    pageSizes?: number[]

    data?: any[]

    Detail?: React.FC
}

const ABookTable = (props: ITableProps) => {

    const { entityDataSource } = props

    const [columns, setColumns] = useState<IColumnProps[]>(() => null);

    const {
        remoteReadMany
    } = useABookCRUDEndpoint();

    const [activePage, setActivePage] = useState<number>(1);

    const [pageSize, setPageSize] = useState<number>(() => props.pageSizes?.length ? props.pageSizes[0] : 20);



    const read = useCallback(async () => {

        const result = await remoteReadMany({ entity: entityDataSource.entity, skip: activePage, take: pageSize, extend: entityDataSource.extend });
        return result;
    },
        [activePage, pageSize]
    )


    const {
        error,
        refresh,
        state: asyncData,
        status
    } = useAsyncState({
        asyncFunction: entityDataSource ? read : null,
        cancelFetch: false,
        dependencyArray: [entityDataSource.entity]
    })

    const [gridData, setGridData] = useState(() => props.data || asyncData);

    useEffect(() => {
        setGridData(()=> props.data || asyncData)
    },
        [props.data, asyncData]
    )


    const onColumnsChanged: IABookCtxProviderTableProps['onColumnsChanged'] = useCallback((columns) => {
        setColumns(columns)
    },
        []
    )

    const childColumns = props.children?.filter((child) => child.type === Column);


    const [filters, setFilters] = useState<{ [dataField: string]: IFilterPart }>({})

    const onFiltersValueChanged: ITableFilterProps['onFiltersChanged'] = (filters) => {
        setFilters(filters);
    }

    const { filteredData } = useApplyFilter({ data: gridData, filters });

    const getPaginatedData = (pageSize: number, activePage: number, pageData: any[]) => {

        return pageData?.filter((row, index) => index >= (activePage - 1) * pageSize && index <= activePage * pageSize);
    }

    const [paginatedData, setPaginatedData] = useState(() => getPaginatedData(pageSize, activePage, filteredData));

    useEffect(() => {
        setPaginatedData(() => getPaginatedData(pageSize, activePage, filteredData))
    },
        [pageSize, activePage, filteredData]
    )

    if (status === 'fetching') {
        return <Loader></Loader>
    }
    console.log('gridData',gridData)
    return <ABookTableCtxProvider
        onColumnsChanged={onColumnsChanged}
    >
        {props.AddButton && props.AddButton}
        <Table
            {...props}
        >
            <Table.Header>
                {childColumns}

            </Table.Header>

            <TableFilter
                columns={columns}
                onFiltersChanged={onFiltersValueChanged}
            ></TableFilter>

            {
                status === 'fetched' &&
                paginatedData
                    ?.map((rowData) => {

                        return <TableRow
                            key={rowData[props.keyField]}
                            keyField={props.keyField}
                            rowData={rowData}
                            sortedColumns={columns}
                            rowActionButtons={props.rowActionButtons}
                            Detail={props.Detail}
                        ></TableRow>
                    })
            }
        </Table>

        {
            props.pagination &&
            <Pagination
                totalPages={gridData?.length / pageSize}
                activePage={activePage}
                {...props.pagination}
            ></Pagination>
        }

        {
            props.pageSizes &&
            <Menu
            >
                {props.pageSizes.map((loopPageSize) => {

                    return <Menu.Item active={loopPageSize === pageSize} onClick={() => setPageSize(loopPageSize)}>{loopPageSize}</Menu.Item>
                })}
            </Menu>
        }
    </ABookTableCtxProvider >
}

export default ABookTable;
