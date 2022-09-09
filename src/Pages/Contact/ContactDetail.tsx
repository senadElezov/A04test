import { Table } from "semantic-ui-react"
import ABookTable from "../../components/ABookTable/ABookTable"
import Column from "../../components/ABookTable/Components/Column/Column"
import { ABookDBModel } from "../../repository/ABookDBModel"

export interface IContactDetailProps {
    rowData: ABookDBModel['Person']
}
const ContactDetail = (props: IContactDetailProps) => {

    const dataFields = ['Type', 'Detail', 'Description'];

    const contactDetails = props?.rowData?.Contacts;

    return <Table
    >
        <Table.Header>
            {dataFields?.map(dataField => <Table.HeaderCell key={dataField}>{dataField}</Table.HeaderCell>)}
        </Table.Header>
        {
            contactDetails?.map((contact) => {
                return <Table.Row
                    key={contact.ID}
                >
                    {
                        dataFields.map(dataField => <Table.Cell>{contact[dataField]}</Table.Cell>)
                    }
                </Table.Row>
            })
        }
    </Table>
}

export default ContactDetail