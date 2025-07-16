import { createSelector } from "reselect";
import type { IStoreState } from "types";

const selectUser = (state: IStoreState) => state.user;

const selectUserData = createSelector(
  [selectUser],
  (user) => ({
    user: user.user,
  })
);

export { selectUserData };