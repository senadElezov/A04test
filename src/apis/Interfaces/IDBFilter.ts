import { WhereFilterOp } from "firebase/firestore"

export type FilterOperation = '=' | '>' | '<' | '>=' | '<=' | '<>' | 'contains' | 'notcontains' | 'startswith' | 'endswith' | 'isnull' | 'isnotnull'

export interface IDBFilter {

    dataField?:string

    operation?:WhereFilterOp

    value?:any

    filters?:IDBFilter[]

    joiner?:'and' | 'or' 

}
