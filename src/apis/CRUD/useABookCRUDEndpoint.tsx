import { useCallback } from "react";


import { collection, addDoc, deleteDoc, getDocs, getDoc, updateDoc, doc, query, where } from 'firebase/firestore';
import { database } from "../../firebaseApp";
import { ABookDBModel } from "../../repository/ABookDBModel";
import { IDBFilter } from "../Interfaces/IDBFilter";
import { IDBSort } from "../Interfaces/IDBSort";


const useABookCRUDEndpoint = () => {

    const remoteCreate = useCallback(async <EntityName extends keyof ABookDBModel>(params: {
        entity: EntityName,
        createDto: Omit<ABookDBModel[EntityName], 'id'>
    }): Promise<string> => {

        const {
            createDto,
            entity
        } = params;

        const collectionRef = collection(database, entity);

        try {

            const result = await addDoc(collectionRef, createDto);

            return result.id;
        }
        catch (error) {
            throw (error.message)

        }
    },
        []
    )

    const remoteReadOne = useCallback(async<EntityName extends keyof ABookDBModel>(params:
        {
            entity: EntityName,
            ID: string
        }
    ): Promise<ABookDBModel[EntityName]> => {

        const {
            ID,
            entity
        } = params;


        const docRef = doc(database, entity, ID);

        try {
            const result = await getDoc(docRef);

            return (result?.exists() && { ...result.data(), ID: result.id }) as unknown as ABookDBModel[EntityName];
        }
        catch (error) {
            throw (error.messge)
        }
    },
        []
    )

    const remoteReadMany = useCallback(async <EntityName extends keyof ABookDBModel>(params:
        {
            entity: EntityName,
            filter?: IDBFilter[],
            extend?: keyof ABookDBModel[EntityName]
            sort?: IDBSort
            skip?: number,
            take?: number
        }
    ): Promise<ABookDBModel[EntityName][]> => {

        const { entity, filter, skip, sort, take, extend } = params;


        try {

            const getWhere = (filter: IDBFilter[]) => {

                return filter?.map((filterPart) => {

                    const {
                        dataField,
                        operation,
                        value
                    } = filterPart

                    return where(dataField, operation, value)
                })
            }

            const finalWhere = getWhere(filter);
            const collectionRef = collection(database, entity);

            const finalQuery = finalWhere ? query(collectionRef, ...finalWhere) : query(collectionRef)
            const result = await getDocs(finalQuery);

            const returningData: ABookDBModel[EntityName][] = []

            await result?.forEach(async (doc) => {
                const currentData: any = { ...doc.data(), ID: doc.id }


                returningData.push(currentData)
            })

            if (extend) {
                returningData.forEach(async (row: any) => {
                    const extendedRef = collection(database, entity + '/' + row.ID + '/' + extend.toString())

                    const extendedResult = await getDocs(extendedRef);

                    const extendedData = []
                    await extendedResult.forEach((extDoc) => {
                        extendedData.push({ ...extDoc.data(), ID: extDoc.id })
                    })

                    row[extend] = extendedData;

                })
            }

            return returningData;
        }
        catch (error) {

            throw error;
        }
    },
        []
    )

    const remoteDelete = useCallback(async <EntityName extends keyof ABookDBModel>(params: { entity: EntityName, ID }) => {
        const { ID, entity } = params;

        const docRef = doc(database, entity, ID);

        try {

            const result = await deleteDoc(docRef)

            return result;
        }
        catch (error) {
            throw (error.messge)
        }
    },
        []
    )

    const remoteUpdate = useCallback(async <EntityName extends keyof ABookDBModel>(
        params: {
            entity: EntityName,
            ID: string,
            updateDto: Partial<Omit<ABookDBModel[EntityName], 'ID'>>
        }) => {

        const { ID, entity, updateDto } = params;

        const docRef = doc(database, entity, ID);

        try {
            const result = await updateDoc(docRef, updateDto);

            return;
        }
        catch (error) {
            throw (error.messge)
        }
    },
        []
    )

    return {
        remoteCreate,
        remoteReadOne,
        remoteReadMany,
        remoteDelete,
        remoteUpdate,
        // remoteEditorSource
    }
}

export default useABookCRUDEndpoint;
