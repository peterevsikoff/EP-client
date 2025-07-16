import type { IUser } from "types";

interface IUserState {
    user: IUser | null,
}

interface IStoreState {
    user: IUserState,
}

export type {
    IStoreState,
    IUserState
}