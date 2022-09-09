import { FormProps } from "semantic-ui-react";
import { StringDict } from "./ContextProviders/IABookFormCtxProvider";
import { IEntityDataSource } from "./Editors/SelectBox/SelectBox";

export interface IABookFormProps extends FormProps {

    entityDataSource?: IEntityDataSource

    editing?: {
        allowInsert?: boolean,
        allowDelete?: boolean,
        allowUpdate?: boolean
    } | boolean

    formData?: any

    onFormDataChanged?: (formData: any) => any

    children?: any

    colCount?: number

    onSubmit?: (params: { formData: StringDict, isValid: boolean }) => any

    toolbarRender?: () => JSX.Element
}

