import { useContext, useEffect, useRef, useState } from "react";
import { Dropdown, DropdownItem, DropdownMenu, Form, FormSelectProps } from "semantic-ui-react";
import { IDBFilter } from "../../../../../apis/Interfaces/IDBFilter";
import { ABookDBModel } from "../../../../../repository/ABookDBModel";
import { ABookFormCtx } from "../../../ContextProviders/IABookFormCtxProvider";
import { SimpleItemCtx } from "../../Items/SimpleItem/SimpleItemCtxProvider";
import useSyncFormData from "../Hooks/useSyncFormData";
import useGetSelectBoxDataSource from "./useGetSelectBoxDataSource";

export interface IEntityDataSource<EntityName extends keyof ABookDBModel = keyof ABookDBModel> {

    keyValue?: string

    extend?: keyof ABookDBModel[EntityName]

    entity: EntityName

    filter?: IDBFilter[]

}

export interface ISelectBoxProps extends FormSelectProps {

    valueExpr?: string,

    displayExpr?: string,

    searchTimeout?: string

    entityDataSource?: IEntityDataSource
}

const SelectBox = (props: ISelectBoxProps) => {

    const {
        dataStatus,
        editorData,
        error,
        refreshEditorSource
    } = useGetSelectBoxDataSource({
        entityDataSource: props.entityDataSource,
    });

    const { dataField } = useContext(SimpleItemCtx);

    const { onChange, value } = useSyncFormData({
        dataField: dataField,
        onChange: props.onChange
    })

    const { validationResult, validateForm } = useContext(ABookFormCtx);

    useEffect(() => {
        if (validationResult[dataField]?.isValid === false) {
            validateForm();
        }
    },
        [value, validationResult[dataField]?.isValid]
    )

    const inputRef = useRef<HTMLInputElement>(null);

    return <Form.Select
        options={[editorData]}
        loading={dataStatus === 'fetching'}
        scrolling={true}
        search={true}

        disabled
        {...props}
        onChange={onChange}
        value={value}
    >
        <input ref={inputRef} value={value || ''} />
    </Form.Select>
}

export default SelectBox;

