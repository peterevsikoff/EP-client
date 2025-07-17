import type { ICommonState } from "types";
import { languageRu } from "../../locale/ru-RU";

const initialState = {
    language: languageRu,
} as ICommonState

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const commonReducer = (state: ICommonState = initialState, action: any) => {
    switch(action.type) {
        default: {
            return state;
        }
    }
}

export { commonReducer };