import React from "react";
import { useContext, useEffect } from "react";
import { Table } from "semantic-ui-react";
import { ABookTableCtx } from "../CtxProviders/ABookTableCtxProvider";
import { IColumnProps } from "./IColumnProps";

const Column = (props: IColumnProps) => {

    const { addColumn } = useContext(ABookTableCtx);

    useEffect(() => {

        addColumn(props)
    },
        [props]
    )

    return <Table.HeaderCell>
        {props.caption || props.dataField}
    </Table.HeaderCell>
}

export default React.memo(Column, (prevProps, nextProps) => {

    if (Object.values(prevProps).length !== Object.values(nextProps).length) {
        return false;
    }

    for (const [propName, propValue] of Object.entries(prevProps)) {

        const nextProp = prevProps[propName];

        if (typeof propValue === 'object' && JSON.stringify(propValue) === nextProp) {
            return false;
        }

        if (propValue !== nextProp) {
            return false;
        }
    }

    return true;
});

Column.displayName = 'Column';