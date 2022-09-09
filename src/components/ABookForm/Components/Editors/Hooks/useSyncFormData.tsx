import { useCallback, useContext } from "react";
import { FormInputProps } from "semantic-ui-react";
import { ABookFormCtx } from "../../../ContextProviders/IABookFormCtxProvider";

export interface ISyncFormDataParams {

    dataField?: string

    onChange?: FormInputProps['onChange']
}

const useSyncFormData = (params: ISyncFormDataParams) => {

    const { dataField, onChange: onChangeProps } = params;

    const { setFormData, formData } = useContext(ABookFormCtx);

    const onChange: FormInputProps['onChange'] = useCallback((evParams, data) => {

        if (onChangeProps) {
            onChangeProps(evParams, data)
        }

        setFormData((formData) => {

            return {

                ...formData,
                [dataField]: data.value
            }
        })

    },
        [dataField, onChangeProps]
    )
    
    return {
        value: formData[dataField],
        onChange
    }

}

export default useSyncFormData;