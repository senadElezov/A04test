import { useContext } from "react";
import { Button } from "semantic-ui-react";
import { ABookFormCtx } from "../ContextProviders/IABookFormCtxProvider";

const SubmitButton = (props) => {

    const { validateForm, formData } = useContext(ABookFormCtx);

    return <Button
        
        color="green"
        onClick={() => {

            const isValid = validateForm();
            props.onSubmit({ formData, isValid });
        }}
    >Submit</Button>
}

export default SubmitButton;
