import { Button, Pagination, Rating, Segment } from "semantic-ui-react";
import useABookCRUDEndpoint from "../../apis/CRUD/useABookCRUDEndpoint";
import ABookTable from "../../components/ABookTable/ABookTable";
import Column from "../../components/ABookTable/Components/Column/Column";
import useABookHistory from "../../redux/useABookHistory";
import { ABookDBModel } from "../../repository/ABookDBModel";
import ContactDetail from "./ContactDetail";

const Contacts = (props: any) => {

    const { remoteUpdate, remoteDelete } = useABookCRUDEndpoint()

    const { push } = useABookHistory();

    return <>
        <ABookTable
            keyField={'ID'}
            entityDataSource={{
                entity: 'Person',
                extend: 'Contacts'
            }}
            pagination={{
                totalPages: 1
            }}
            pageSizes={[10, 15, 20]}
            AddButton={<Button
                onClick={() => push('contact/details', { ID: '-1' })}
                icon='add'
            >
                Add
            </Button>}
            Detail={ContactDetail}
            rowActionButtons={[
                {
                    icon: 'delete',
                    onClick: async (key, rowData, refresh) => {

                        await remoteDelete({
                            entity: 'Person',
                            ID: key
                        });

                        refresh();
                    }
                },
                {
                    icon: 'edit',
                    onClick: async (key, rowData, refresh) => {
                        push('contact/details', { ID: key });
                    }
                }
            ]}
        >
            <Column
                dataField={"FirstName" as keyof ABookDBModel['Person']}
                dataType='string'
            ></Column>
            <Column
                dataField={"LastName" as keyof ABookDBModel['Person']}
                dataType='string'
            ></Column>
            <Column
                dataField={"Favourite" as keyof ABookDBModel['Person']}
                dataType='boolean'
                renderCell={(rowData) =>
                    <Rating
                        icon="star"
                        onRate={(evParams, data) => {
                            remoteUpdate({
                                entity: 'Person',
                                ID: rowData.ID,
                                updateDto: { Favourite: data.rating === 1 }
                            })

                        }}></Rating>
                }
            ></Column>

        </ABookTable>
    </>
}

export default Contacts