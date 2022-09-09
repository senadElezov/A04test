export interface IRemoteParams<Response extends any = any> {

    errorMessage?: ((error: Error) => string) | string

    successMessage?: ((result: Response) => string) | string

    showDisplayMessages?: boolean

}