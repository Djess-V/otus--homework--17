import type { AnyAction } from "redux";
import initialState, { IUsers } from "../store/initial-state";

export default function usersReducer(
  state = initialState.users,
  action: AnyAction
) {
  switch (action.type) {
    case "ADD_USER":
      return { ...state, ...(action.payload as IUsers) };
    default:
      return state;
  }
}
