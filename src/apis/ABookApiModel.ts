import { ABookDBModel } from "../../repository/ABookDBModel";

export interface IRemoteMethodSignature
    <
    Params extends { [key: string]: number | string | boolean } = { [key: string]: number | string | boolean },
    Body extends any = any,
    Returns extends any = any
    > {
    params: string
    body: number
    returns: boolean
}

export type HttpMethods = 'post' | 'get' | 'delete' | 'put'
export type PathDefinition<T extends { post?: IRemoteMethodSignature, get?: IRemoteMethodSignature, delete?: IRemoteMethodSignature, put?: IRemoteMethodSignature }> = T;

export type ABookAPIModel = {

    Path: PathDefinition<{
        post: IRemoteMethodSignature<{ ID: number }, { test: 'test' }, string>
    }>
}





