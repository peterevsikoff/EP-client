import { SET_USER } from "../action-types";

const initialState = {
    user: null,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const userReducer = (state: any = initialState, action: any) => {
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