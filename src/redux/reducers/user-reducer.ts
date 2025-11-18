import type { IUserState } from "types";
import { SET_USER } from "../action-types";
import type { setUser } from "action-creators";

const user = JSON.parse(localStorage.getItem("EasyPsyUser") || "null");
const initialState = {
    user,
}

type UserActions = ReturnType<typeof setUser>

const userReducer = (state: IUserState = initialState, action: UserActions) => {
    switch(action.type) {
        case SET_USER: {
            const { user } = action;
            return ({
                ...state,
                user,
            })
        }
        default: {
            return state;
        }
    }
}

export { userReducer };