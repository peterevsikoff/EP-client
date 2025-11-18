import type { IUser, POPUPMESSAGE } from "types";

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

interface IPopUpState {
    messages: IPopUpMessage[]
}

interface IStoreState {
    user: IUserState,
    common: ICommonState,
    admin: IAdminState,
    popUp: IPopUpState,
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
    message: string,
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

interface IPopUpMessage {
    id: string,
    text: string,
    type: POPUPMESSAGE,
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
    IPopUpMessage,
}