import type { AnyAction } from "redux";
import initialState, { IMessages } from "../store/initial-state";

export default function messagesReducer(
  state = initialState.messages,
  action: AnyAction
) {
  switch (action.type) {
    case "ADD_MESSAGE":
      return { ...state, ...(action.payload as IMessages) };
    case "ADD_MESSAGES":
      return { ...(action.payload as IMessages) };
    case "CLEAR_MESSAGES":
      return {};
    default:
      return state;
  }
}
