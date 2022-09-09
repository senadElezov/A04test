import { useContext } from "react";
import { Button, Menu } from "semantic-ui-react";
import useABookCRUDEndpoint from "../../../apis/CRUD/useABookCRUDEndpoint";
import { ABookDBModel } from "../../../repository/ABookDBModel";
import { ABookFormCtx } from "../ContextProviders/IABookFormCtxProvider";
import { IEntityDataSource } from "./Editors/SelectBox/SelectBox";

export type FormEditMode = 'read' | 'update' | 'insert'

export interface IFormCRUDMenuProps<EntityName extends keyof ABookDBModel = keyof ABookDBModel> {

    editing?: {
        allowInsert?: boolean,
        allowUpdate?: boolean,
        allowDelete?: boolean
    } | boolean

    entityDataSource?: IEntityDataSource<EntityName>

}

const CRUDDisplayMessages = {
    CREATE: 'Save',
    UPDATE: 'Update',
    DELETE: 'Delete',
    EDIT: 'Edit',
    CANCEL: 'Cancel'
}

const FormCRUDMenu = (props: IFormCRUDMenuProps) => {

    const { editing, entityDataSource } = props;

    const { formEditMode, setFormEditMode, validateForm, formData } = useContext(ABookFormCtx);

    const {
        remoteCreate,
        remoteDelete,
        remoteUpdate
    } = useABookCRUDEndpoint();

    const {
        CREATE, DELETE, EDIT, UPDATE, CANCEL
    } = CRUDDisplayMessages

    return <Menu >

        {
            formEditMode === 'read' &&
            <Menu.Item>
                < Button
                    icon='edit'
                    color="brown"
                    onClick={() => setFormEditMode('update')}
                >
                    {EDIT}
                </Button>
            </Menu.Item>
        }

        {
            formEditMode === 'insert' &&
            <Menu.Item>
                <Button
                    icon='save'
                    color="green"
                    onClick={() => {
                        const isFormValid = validateForm();
                        if (!isFormValid) {
                            return;
                        }

                        remoteCreate({
                            createDto: formData as any,
                            entity: entityDataSource.entity,
                        });
                    }}
                >
                    {CREATE}
                </Button>
            </Menu.Item>
        }

        {formEditMode === 'update' &&
            <>
                <Menu.Item>
                    < Button
                        icon='save'
                        color="green"
                        onClick={() => {
                            const isFormValid = validateForm();
                            if (!isFormValid) {
                                return;
                            }

                            remoteUpdate({
                                entity: entityDataSource.entity,
                                ID: entityDataSource.keyValue,
                                updateDto: formData
                            });
                        }}
                    >{UPDATE}</Button>
                </Menu.Item>

                <Menu.Item>
                    < Button
                        icon='save'
                        color="orange"
                        onClick={() => setFormEditMode('read')}
                    >{CANCEL}</Button>
                </Menu.Item>
            </>
        }

        {
            ['update', 'read'].includes(formEditMode) &&
            <Menu.Item>
                <Button
                    icon='thrash'
                    color="red"
                    onClick={async () => {
                        await remoteDelete({
                            entity: entityDataSource.entity,
                            ID: entityDataSource.keyValue
                        })
                        setFormEditMode('insert')
                    }}
                >{DELETE}</Button>
            </Menu.Item>
        }

    </Menu >
}

export default FormCRUDMenu;