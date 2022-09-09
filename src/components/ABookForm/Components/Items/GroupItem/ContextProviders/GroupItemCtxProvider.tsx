import { createContext } from "react";


export interface IGroupItemCtx {

    colCount?: number


}

export interface IGroupItemCtxProviderProps {

    colCount?: number
    children?: any

}

export const GroupItemCtx = createContext<IGroupItemCtx>({})

const GroupItemCtxProvider = (props: IGroupItemCtxProviderProps) => {
    const { colCount } = props

    return <GroupItemCtx.Provider
        value={{
            colCount
        }}
    >
        {props.children}
    </GroupItemCtx.Provider>
}

export default GroupItemCtxProvider;