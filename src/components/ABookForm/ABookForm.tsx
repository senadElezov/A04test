import { Button, Form, Grid, Segment, SemanticWIDTHS } from "semantic-ui-react";
import FormCRUDMenu from "./Components/FormCRUDMenu";
import GroupItem from "./Components/Items/GroupItem/GroupItem";
import SubmitButton from "./Components/SubmitButton";
import ABookFormCtxProvider from "./ContextProviders/IABookFormCtxProvider";
import { IABookFormProps } from "./IABookFormProps";


const ABookForm = (props: IABookFormProps) => {

    const children = Array.isArray(props.children) ? props.children : [props.children]

    const groupItemChildren = children.filter((child) => child?.type === GroupItem)

    return <ABookFormCtxProvider
        entityDataSource={props.entityDataSource}
        formData={props.formData}
        onFormDataChanged={props.onFormDataChanged}

    >
        <div id='formDiv'>

            {
                props.entityDataSource &&
                <FormCRUDMenu
                    editing={props.editing}
                    entityDataSource={props.entityDataSource}
                ></FormCRUDMenu>
            }
            {
                props.onSubmit &&
                <Segment secondary color='grey'>
                    <SubmitButton onSubmit={props.onSubmit}></SubmitButton>
                    {props.toolbarRender && props.toolbarRender()}
                </Segment>
            }
            <Form
            >
                <Grid columns={'1'}
                >
                    {groupItemChildren}
                </Grid>
            </Form>
        </div >
    </ABookFormCtxProvider>
}

export default ABookForm;