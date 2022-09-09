import { useEffect, useState } from "react";
import { FilterOperation } from "../../../apis/Interfaces/IDBFilter";
import { IFilterPart } from "../Components/TableFilter/TableFilter";

export interface IApplyFilterParams {

    filters?: { [dataField: string]: IFilterPart }

    data?: any[]
}

const filterCalculator: { [operation in FilterOperation]: (value, filterValue?) => boolean } = {
    "<": (value, filterValue) => value < filterValue,
    "<=": (value, filterValue) => value <= filterValue,
    ">": (value, filterValue) => value >= filterValue,
    ">=": (value, filterValue) => value >= filterValue,
    "<>": (value, filterValue) => value !== filterValue,
    "=": (value, filterValue) => value === filterValue,
    "contains": (value: string, filterValue) => value.includes(filterValue),
    "endswith": (value: string, filterValue) => value.endsWith(filterValue),
    "startswith": (value: string, filterValue) => value.startsWith(filterValue),
    "isnotnull": (value: string) => ![null, undefined].includes(value),
    "isnull": (value: string) => [null, undefined].includes(value),
    "notcontains": (value: string, filterValue) => !value.includes(filterValue),

}


const useApplyFilter = (params: IApplyFilterParams) => {

    const { data, filters } = params;

    const getFilteredData = () => {


        if (!data || !filters) {
            return data;
        }

        return data
            .filter(rowData => {

                for (const [dataField, filterPart] of Object.entries(filters)) {

                    const {
                        operation,
                        value: filterValue
                    } = filterPart

                    const conditionFunction = filterCalculator[operation]
                    const conditionMet = conditionFunction(rowData[dataField], filterValue)

                    if (!conditionMet) {
                        return false;
                    }
                }


                return true;
            })

    }

    const [filteredData, setFilteredData] = useState<any[]>(() => getFilteredData());


    useEffect(() => {
        setFilteredData(() => getFilteredData());
    },
        [data, filters]
    )

    return {
        filteredData
    }
}

export default useApplyFilter;