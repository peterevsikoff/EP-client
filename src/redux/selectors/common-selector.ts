import { createSelector } from "reselect";
import type { IStoreState } from "types";

const selectCommon = (state: IStoreState) => state.common;

const selectCommonData = createSelector(
  [selectCommon],
  (common) => ({
    language: common.language,
  })
);

export { selectCommonData };