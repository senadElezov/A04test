import { useCallback, useContext, useEffect, useRef } from "react";
import { Form, FormInputProps } from "semantic-ui-react";
import { ABookFormCtx } from "../../../ContextProviders/IABookFormCtxProvider";
import { SimpleItemCtx } from "../../Items/SimpleItem/SimpleItemCtxProvider";
import useSyncFormData from "../Hooks/useSyncFormData";

const DEFAULT_VALIDATION_TIMEOUT = 200;

const TextBox = (props: FormInputProps & { focusOnLoad?: boolean }) => {


    const { validationResult, validateForm } = useContext(ABookFormCtx);

    const { dataField } = useContext(SimpleItemCtx)

    const { onChange, value } = useSyncFormData({
        dataField: dataField,
        onChange: props.onChange
    });

    useEffect(() => {
        if (validationResult[dataField]?.isValid === false) {
            validateForm();
        }
    },
        [value, validationResult[dataField]?.isValid]
    )

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(!props.focusOnLoad) {
            return;
        }
        
        setTimeout(() => {
            
            inputRef.current.focus();
        })
    },
        []
    )

    return <Form.Input
        {...props}
        onChange={onChange}

        error={validationResult[dataField]?.isValid === false}

    >
        <input
            ref={inputRef}
            value={value || ''}
        >

        </input>
    </Form.Input>
}

export default TextBox