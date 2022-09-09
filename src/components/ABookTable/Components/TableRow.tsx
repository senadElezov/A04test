import { Button, Table } from "semantic-ui-react"
import { IABookTableProps } from "../ABookTable"
import { IColumnProps } from "./Column/IColumnProps"

export interface ITableRowProps extends Pick<IABookTableProps, 'rowActionButtons' | 'Detail'> {

    sortedColumns?: IColumnProps[]

    rowData?: any

    keyField?: string

}

const TableRow = (props: ITableRowProps) => {
    const { sortedColumns, rowData } = props;

    return <><Table.Row>
        {sortedColumns.map((column) => {
            return <Table.Cell>
                {column.renderCell ? column.renderCell(rowData) : rowData[column.dataField]}
            </Table.Cell>
        })}
        <Table.Cell>
            {props.rowActionButtons && props.rowActionButtons.map((props) => {

                return <Button
                    {...props}
                    onClick={() => {
                        props.onClick(rowData[props.keyField], rowData, () => { })
                    }}
                ></Button>
            })}
        </Table.Cell>


    </Table.Row>
        {props.Detail &&
            <Table.Row>
                <Table.Cell width={'16'}>
                    <props.Detail
                        rowData={rowData}
                    ></props.Detail>
                </Table.Cell>
            </Table.Row>
        }
    </>
}

export default TableRow