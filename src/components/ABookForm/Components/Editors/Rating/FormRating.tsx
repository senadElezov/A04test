import { RatingProps } from "@mui/material";
import { useContext, useEffect, useState } from "react"
import { Rating } from "semantic-ui-react";
import { SimpleItemCtx } from "../../Items/SimpleItem/SimpleItemCtxProvider";
import { ABookFormCtx } from "../../../ContextProviders/IABookFormCtxProvider";

export interface IRatingProps {
    value?: boolean
    onValueChanged?: (value: boolean) => any
    label?: string
}

const FormRating = (props: IRatingProps) => {

    const [value, setValue] = useState(props.value);

    const { dataField } = useContext(SimpleItemCtx);

    const { formData, setFormData } = useContext(ABookFormCtx);

    useEffect(() => {

        setValue(formData[dataField]);

    },
        [dataField, formData[dataField]]
    )

    useEffect(() => {
        if (props.onValueChanged) {
            props.onValueChanged(value)
        }

        setFormData((prevFormData) => {

            return {
                ...prevFormData,
                [dataField]: value
            }
        })

    },
        [value]
    )

    return <div className="field">
        <label>{props.label}</label>
        <Rating
            maxRating={1}
            id={'star' + dataField}
            icon="star"
            size="massive"
            rating={value ? 1 : 0}
            onRate={(evParams, data) => {
                setValue(Boolean(data.rating))
            }}
        ></Rating>
    </div>
}

export default FormRating;