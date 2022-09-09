import { useContext, useEffect, useState } from "react"
import { Grid, Popup, SemanticWIDTHS } from "semantic-ui-react"
import { GroupItemCtx } from "../GroupItem/ContextProviders/GroupItemCtxProvider"
import useCalculateWidth from "../useCalculateWidth"
import SimpleItemCtxProvider from "./SimpleItemCtxProvider"

import './simpleItem.css'
import { ABookFormCtx } from "../../../ContextProviders/IABookFormCtxProvider"

export interface IValidationRule {
    type: 'required' | 'custom',
    message?: string | ((value?: string, label?: string) => string),
    validationCallback?: (params: { data?: any, value?: any }) => boolean | Promise<boolean>
}

export interface ISimpleItemProps {

    dataField?: string

    colSpan?: number

    validationRules?: IValidationRule[]

    children?: any
}

const SimpleItem = (props: ISimpleItemProps) => {

    const { colSpan, validationRules, dataField } = props;

    const { setDataFieldValidationRules, validationResult } = useContext(ABookFormCtx);

    useEffect(() => {
        if (!validationRules) {
            return;
        }
        setDataFieldValidationRules(dataField, validationRules)
    },
        [validationRules]
    )

    const dataFieldValidationResult = validationResult[dataField];

    const { calculatedWidth } = useCalculateWidth(colSpan || 1);

    return <Grid.Column width={calculatedWidth}>
        <SimpleItemCtxProvider
            dataField={dataField}
        >
            <Popup
                trigger={props.children}
                className='tooltip'
                position="bottom left"
                open={dataFieldValidationResult?.isValid === false}
            >
                {dataFieldValidationResult?.validationMessages?.map((msg) => <p>{'!' + msg}</p>)}
            </Popup>

        </SimpleItemCtxProvider>
    </Grid.Column>
}

export default SimpleItem;