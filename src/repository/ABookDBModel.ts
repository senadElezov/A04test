
export type ABookDBModel = {

    Person: {
        ID: number,
        FirstName: string,
        LastName: string,
        DateOfBirth: Date
        Favourite: boolean,
        Contacts: {
            ID: string,
            Type: string
            Description?: string
            Details: string
        }[]
    }

}