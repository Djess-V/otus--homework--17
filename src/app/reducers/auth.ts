import type { AnyAction } from "redux";
import initialState, { IAuth } from "../store/initial-state";

export default function authReducer(
  state = initialState.auth,
  action: AnyAction
) {
  switch (action.type) {
    case "SIGN_OUT":
      return {
        ...state,
        ...(action.payload as IAuth),
      };
    case "SIGN_IN":
      return {
        ...state,
        ...(action.payload as IAuth),
      };
    default:
      return state;
  }
}
