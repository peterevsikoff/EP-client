import type { IUser } from "types";

interface ILanguage {
    [key: string]: string
}

interface ICommonState {
    language: ILanguage,
    // role: ROLES,
    // user?: IUserAuthorized,
}

interface IUserState {
    user: IUser | null,
}

interface IAdminState {
    users: IUser[] | null,
}

interface IStoreState {
    user: IUserState,
    common: ICommonState,
    admin: IAdminState,
}

interface IPage {
    title: string,
    description: string,
    noRobots?: boolean
}

interface MainTypeForChange {
    [index:string]: string | number
}

interface IError {
    errorText: string,
    notAuthorized?: boolean,
    exist?: boolean,
}

interface ICallbackSuccess {
    (): void
}

interface ICallbackError {
    (error: IError): void
}

interface ICallbackServerError {
    (): void
}

export type {
    ILanguage,
    IStoreState,
    IUserState,
    ICommonState,
    ICallbackError,
    ICallbackServerError,
    ICallbackSuccess,
    IError,
    IPage,
    MainTypeForChange,
}