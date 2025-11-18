import { ADD_POP_UP_MESSAGES, DELETE_POP_UP_MESSAGES } from "action-types";
import type { IPopUpMessage } from "types";

const initialState = {
    messages: [] as IPopUpMessage[],
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const popUpReducer = (state: any = initialState, action: any) => {
    switch(action.type) {
        case ADD_POP_UP_MESSAGES: {
            const { message } = action;
            return ({
                ...state,
                messages: [...state.messages, message],
            })
        }
        case DELETE_POP_UP_MESSAGES: {
            const { id } = action;
            return ({
                ...state,
                messages: (state.messages as IPopUpMessage[]).filter(x => x.id !== id),
            })
        }
        default: {
            return state;
        }
    }
}

export { popUpReducer };