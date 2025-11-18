import { createSelector } from "reselect";
import type { IStoreState } from "types";

const selectPopUp = (state: IStoreState) => state.popUp;

const selectPopUpData = createSelector(
  [selectPopUp],
  (popUp) => ({
    messages: popUp.messages,
  })
);

export { selectPopUpData };