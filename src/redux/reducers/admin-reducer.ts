import { SET_USERS } from "action-types";

const initialState = {
    users: null,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const adminReducer = (state: any = initialState, action: any) => {
    switch(action.type) {
        case SET_USERS: {
            const { users } = action;
            return ({
                ...state,
                users,
            })
        }
        default: {
            return state;
        }
    }
}

export { adminReducer };