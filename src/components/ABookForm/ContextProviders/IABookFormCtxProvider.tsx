import React, { createContext, isValidElement, useCallback, useEffect, useState } from "react";
import { FormEditMode } from "../Components/FormCRUDMenu";
import { IEntityDataSource } from "../Editors/SelectBox/SelectBox";
import { IValidationRule } from "../Items/SimpleItem/SimpleItem";

export type StringDict<T = any> = { [key: string]: T }

export interface IValidationResult {
    isValid?: boolean,

    validationMessages?: string[]
}

export interface IABookCtxProviderProps {

    entityDataSource?: IEntityDataSource

    onDataFieldValidationRulesChanged?: (dataFieldValidationRules: StringDict<IValidationRule[]>) => any

    submit?: (params: { formData?: any, validationResult: StringDict<IValidationResult> }) => any

    children?: any

    formData?: StringDict

    onFormDataChanged?: (formData: StringDict) => any
}

export interface IABookCtx {

    dataFieldValidationRules?: { [dataField: string]: IValidationRule[] }

    setDataFieldValidationRules?: (dataField: string, validationRules: IValidationRule[]) => any

    validationResult?: { [dataField: string]: IValidationResult }

    formData?: StringDict

    setFormData?: React.Dispatch<React.SetStateAction<StringDict>>;

    formEditMode?: FormEditMode

    setFormEditMode?: React.Dispatch<React.SetStateAction<FormEditMode>>;

    validateForm?: () => any
}

export const ABookFormCtx = createContext<IABookCtx>({});

const ABookFormCtxProvider = (props: IABookCtxProviderProps) => {

    const { onDataFieldValidationRulesChanged } = props;

    const [dataFieldsValidationRules, setDataFieldsValidationRules] = useState<StringDict<IValidationRule[]>>({});

    const [validationResult, setValidationResult] = useState<StringDict<IValidationResult>>({})

    const [formData, setFormData] = useState<StringDict>(props.formData || {})

    useEffect(() => {

        if (!props.formData) {
            return;
        }
        setFormData(props.formData)
    },
        [props.formData]
    )

    useEffect(() => {
        if (props.onFormDataChanged) {
            props.onFormDataChanged(formData)
        }
    },
        [formData]
    )

    const getInitialFormEditMode = (entityDataSource: IEntityDataSource): FormEditMode => Boolean(entityDataSource?.keyValue) ? 'read' : 'insert'

    const [formEditMode, setFormEditMode] = useState<FormEditMode>(() => getInitialFormEditMode(props?.entityDataSource))


    const setDataFieldValidationRules: IABookCtx['setDataFieldValidationRules'] = (dataField, validationRules) => {

        setDataFieldsValidationRules((prevRules) => {

            return {
                ...prevRules,
                [dataField]: validationRules
            }
        })
    }

    const validateForm = useCallback(() => {

        let isFormValid = true;
        const newValidationResult: StringDict<IValidationResult> = {};


        const validityByType: { [ruleType in IValidationRule['type']]: (formData: StringDict, dataField: string, validationCallback: IValidationRule['validationCallback']) => boolean | Promise<boolean> } = {
            required: (formData, dataField) => ![null, undefined, ''].includes(formData[dataField]),
            custom: (formData, dataField, validationCallback) => validationCallback({ data: formData, value: formData[dataField] })
        }

        Object.entries(dataFieldsValidationRules).forEach(([dataField, rules]) => {

            newValidationResult[dataField] = {
                isValid: true,
                validationMessages: []
            }

            rules.forEach(rule => {

                const message = typeof rule.message === 'string' ? rule.message : rule.message(dataField, '');

                const validatorFunction = validityByType[rule.type];

                const isValid = validatorFunction(formData, dataField, rule.validationCallback);

                isFormValid = isValid && isFormValid;

                newValidationResult[dataField].isValid = isValid && newValidationResult[dataField].isValid

                if(isValid === true) {
                    return;
                }
                
                newValidationResult[dataField].validationMessages.push(message);
                

            })

        })

        setValidationResult(newValidationResult);


        return isFormValid;
    },

        [formData, dataFieldsValidationRules]
    )

    return <ABookFormCtx.Provider
        value={{
            validationResult,
            setDataFieldValidationRules,
            formData,
            setFormData,
            formEditMode,
            setFormEditMode,
            validateForm
        }}
    >
        {props.children}
    </ABookFormCtx.Provider>
}

export default ABookFormCtxProvider;