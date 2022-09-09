import { useEffect, useRef, useState } from "react";
import { Button, Dropdown, Icon, IconProps, Input, Menu, Select } from "semantic-ui-react";
import { FilterOperation } from "../../../../../apis/Interfaces/IDBFilter";
import { IColumnProps } from "../../Column/IColumnProps";
import './filterInput.css'

const filterOperationDisplays: { [operation in FilterOperation]: string } = {
    "<": 'less than',
    "<=": 'less or equal',
    ">": 'greater',
    ">=": 'greater or equal',
    "<>": 'not equal',
    '=': 'equal',
    contains: 'Contains',
    endswith: 'Ends with',
    startswith: 'Starts with',
    isnotnull: 'Has value',
    isnull: 'Doesn\'t have value',
    notcontains: 'Does not contain',
}




const allFieldFilter: FilterOperation[] = ['isnotnull', 'isnull', '=', '<>']

const stringFilters: FilterOperation[] = ['contains', 'notcontains', 'startswith', 'endswith']

const comparerFilters: FilterOperation[] = ['<', '<=', '>=', '>']


export interface IFilterInputProps {

    searchTimeout?: number

    dataField?: string

    dataType?: IColumnProps['dataType']

    filterOperation?: FilterOperation

    onFilterValueChanged?: (evParams: { operation: FilterOperation, value: any }) => any
}

const dataTypeDefaultOperation: { [dataType in IFilterInputProps['dataType']]: FilterOperation } = {
    boolean: '=',
    date: '=',
    number: '=',
    string: 'contains'
}

const DEFAULT_SEARCH_TIMEOUT = 200;

const FilterInput = (props: IFilterInputProps) => {

    const { dataType, onFilterValueChanged } = props;

    const operationsByType: { [dataType in IFilterInputProps['dataType']]: FilterOperation[] } = {
        boolean: allFieldFilter,
        date: [...allFieldFilter, ...comparerFilters],
        number: [...allFieldFilter, ...comparerFilters],
        string: [...allFieldFilter, ...stringFilters]
    }

    const [selectedOperation, setSelectedOperation] = useState<FilterOperation>(dataTypeDefaultOperation[dataType]);

    const [filterValue, setFilterValue] = useState<string>(null);

    const [inputVisible, setInputVisible] = useState<boolean>()

    useEffect(() => {

        const notVisibleInputOperations: FilterOperation[] = ['isnotnull', 'isnull'];

        setInputVisible(() => !notVisibleInputOperations.includes(selectedOperation))
    },
        [selectedOperation]
    )

    useEffect(() => {

        if (onFilterValueChanged) {
            onFilterValueChanged({
                operation: selectedOperation,
                value: filterValue
            })
        }
    },
        [selectedOperation, filterValue]
    )


    return <Input
        className="filter-input"

    >
        <Select
            className="filter-select"
            value={selectedOperation}
            onChange={(e, evParams) => {
                setSelectedOperation(evParams.value as FilterOperation)
            }}
            options={operationsByType[dataType].map((operation) => {

                return {
                    key: operation,
                    text: filterOperationDisplays[operation],
                    value: operation
                }
            })}
        >

        </Select>
        {inputVisible &&
            <input

                value={filterValue || ''} 
                className='filter-inner-select'
                onChange={(evParams) => {
                    const value = evParams.target.value
                    setTimeout(() => {

                        if (value === evParams.target.value) {
                            setFilterValue(evParams.value)

                        }
                    },
                        200
                    );

                }}
            ></input>
        }
    </Input>
}

export default FilterInput;