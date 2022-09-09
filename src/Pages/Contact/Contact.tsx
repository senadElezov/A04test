
import Column from "../../components/ABookTable/Components/Column/Column";
import FormRating from "../../components/ABookForm/Components/Editors/Rating/FormRating";
import { useParams } from "react-router";
import useABookCRUDEndpoint from "../../apis/CRUD/useABookCRUDEndpoint";
import ABookForm from "../../components/ABookForm/ABookForm";
import TextBox from "../../components/ABookForm/Components/Editors/TextBox/TextBox";
import GroupItem from "../../components/ABookForm/Components/Items/GroupItem/GroupItem";
import SimpleItem from "../../components/ABookForm/Components/Items/SimpleItem/SimpleItem";
import useAsyncState from "../../components/ABookForm/useAsyncState";

const Contact = (props) => {

    const { ID } = useParams();

    const { remoteReadMany } = useABookCRUDEndpoint();

    const {
        error,
        refresh,
        state: contactsData,
        status
    } = useAsyncState({
        asyncFunction: async () => remoteReadMany({ entity: 'Person' }),
        cancelFetch: false,
        dependencyArray: []
    })


    return <div>
        <ABookForm
            entityDataSource={{
                entity: 'Person',
                keyValue: ID
            }}
        >
            <GroupItem
                colCountByScreenSize={{
                    s: 1,
                    xl: 3
                }}
                colCount={3}
                colSpan={16}
            >
                <SimpleItem
                    dataField="FirstName"
                    colSpan={1}
                    validationRules={[
                        {
                            type: 'required',
                            message: 'First name is required'
                        }
                    ]}
                >
                    <TextBox
                        label='First name'
                    ></TextBox>
                </SimpleItem>

                <SimpleItem
                    dataField="LastName"
                    colSpan={1}
                    validationRules={[
                        {
                            type: 'required',
                            message: 'Last name is required'
                        }
                    ]}
                >
                    <TextBox
                        label='Last name'
                    ></TextBox>
                </SimpleItem>

                <SimpleItem
                    dataField="Favourite"
                    colSpan={1}
                >
                    <FormRating
                        label='Favourite'
                    ></FormRating>
                </SimpleItem>
            </GroupItem>
        </ABookForm>


    </div>
}

export default Contact;