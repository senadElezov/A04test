import { IEntityDataSource } from "../../../ABookForm/Editors/SelectBox/SelectBox"

export interface IColumnProps {

    dataField?: string

    dataType?: 'string' | 'date' | 'boolean' | 'number'

    lookup?: {
        entityDataSource?: IEntityDataSource

        valueExpr?: string

        displayExpr?: string
    }

    visibleIndex?: number

    allowFilter?: true

    caption?: string

    displayColumn?: string

    calculateDisplayValue?: (rowData: any) => string

    renderCell?: (rowData) => JSX.Element

    children?:any
}
