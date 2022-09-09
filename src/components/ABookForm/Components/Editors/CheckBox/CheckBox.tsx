import { useContext } from "react";
import { Form, FormCheckboxProps } from "semantic-ui-react";
import { SimpleItemCtx } from "../../Items/SimpleItem/SimpleItemCtxProvider";
import { ICheckBoxProps } from "./ICheckBoxProps";

const CheckBox = (props: ICheckBoxProps) => {

    const { dataField } = useContext(SimpleItemCtx)

    return <Form.Checkbox
        {...props}
    >
    </Form.Checkbox>
    
}

export default CheckBox;