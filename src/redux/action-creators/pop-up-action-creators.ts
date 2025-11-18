import { ADD_POP_UP_MESSAGES, DELETE_POP_UP_MESSAGES } from "action-types";
import type { IPopUpMessage } from "types";

const addPopUpMessages = (message: IPopUpMessage) => ({
    type: ADD_POP_UP_MESSAGES,
    message
})

const deletePopUpMessages = (id: string) => ({
    type: DELETE_POP_UP_MESSAGES,
    id
})

export {
    addPopUpMessages,
    deletePopUpMessages,
}