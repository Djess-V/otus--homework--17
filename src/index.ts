import { render } from "./app/render";
import "./styles/styles.css";
import store from "./app/store/store";
import { startListeningToAuthChanges } from "./app/actions/auth";
import { startListeningForUsers } from "./app/actions/users";
import { startListeningForMessages } from "./app/actions/messages";

store.dispatch(startListeningToAuthChanges());
store.dispatch(startListeningForUsers());
store.dispatch(startListeningForMessages());

const div = document.getElementById("app") as HTMLDivElement;

store.subscribe(() => render(div, store.getState()));
