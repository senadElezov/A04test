import { createContext } from "react";
import { ISimpleItemProps } from "./SimpleItem";

export interface ISimpleItemCtxProviderProps {

    dataField?: string
}

export interface ISimpleItemCtx  {

    dataField?: string
}


export const SimpleItemCtx = createContext<ISimpleItemCtx>({})

const SimpleItemCtxProvider = (props: ISimpleItemProps) => {


    return <SimpleItemCtx.Provider
        value={{
            dataField: props.dataField
        }}
    >
        {props.children}
    </SimpleItemCtx.Provider>
}

export default SimpleItemCtxProvider;