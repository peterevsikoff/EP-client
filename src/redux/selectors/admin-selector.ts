import { createSelector } from "reselect";
import type { IStoreState } from "types";

const selectAdmin = (state: IStoreState) => state.admin;

const selectAdminData = createSelector(
  [selectAdmin],
  (admin) => ({
    users: admin.users,
  })
);

export { selectAdminData };