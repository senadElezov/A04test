import { useContext, useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import { FilterOperation } from "../../../../apis/Interfaces/IDBFilter";
import { IColumnProps } from "../Column/IColumnProps";
import { ABookTableCtx } from "../CtxProviders/ABookTableCtxProvider";
import FilterInput from "./Components/FilterInput";

export interface ITableFilterProps {

    columns?: IColumnProps[]

    onFiltersChanged?: (newFilters: { [dataField: string]: IFilterPart }) => any
}

export interface IFilterPart {
    operation: FilterOperation,
    value: any
}

const TableFilter = (props: ITableFilterProps) => {

    const { columns } = useContext(ABookTableCtx);
    const { onFiltersChanged } = props;
    const [filters, setFilters] = useState<{ [dataField: string]: IFilterPart }>({});

    useEffect(() => {

        if (!onFiltersChanged) {
            onFiltersChanged(filters)

        }

    },
        [onFiltersChanged, filters]
    )

    return <Table.Row>

        {
            columns &&
            Object.values(columns)?.map((column, index) => {

                return <Table.Cell key={column.dataField}>
                    <div style={{
                        width: '100%'
                    }}>
                        <FilterInput
                            key={column.dataField}
                            dataType={column.dataType || 'string'}
                            onFilterValueChanged={(filterPart) => {
                                setFilters((prevFilters) => {
                                    return {
                                        ...prevFilters,
                                        [column.dataField]: filterPart
                                    }
                                })
                            }}

                        ></FilterInput>
                    </div>
                </Table.Cell>
            })
        }
    </Table.Row >
}

export default TableFilter;