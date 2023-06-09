import { v4 } from "uuid";
import type { RootState } from "../store/store";
import { signIn, comeOut } from "../actions/auth";
import { addSizeToGoogleProfilePic, displayMessage } from "./displayMessage";
import { createMessage } from "../actions/messages";
import { isUserSignedIn } from "../firebase/firebase";

export function render(el: HTMLDivElement, store: RootState) {
  el.innerHTML = `<div class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">
  <!-- Header section containing logo -->
  <header class="mdl-layout__header mdl-color-text--white mdl-color--light-blue-700" >
    <div class="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">
      <div
        class="mdl-layout__header-row mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop"
      >
        <h3>
          <i class="material-icons">chat_bubble_outline</i> My Chat
        </h3>
      </div>
      <div id="user-container">        
        ${
          store.auth.status === "ANONYMOUS"
            ? `<button
        id="sign-in"
        class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white"
        data-sign="In"
      ><i class="material-icons">account_circle</i>Sign-in with Google
      </button>`
            : ``
        }
      ${
        store.auth.status === "SIGNED_IN"
          ? `<div id="user-pic"></div>
          <div id="user-name">${store.auth.displayName}</div>
          <button
      id="sign-out"
      class="mdl-button mdl-js-button mdl-js-ripple-effect mdl-color-text--white"
      data-sign="Out"
    >
      Sign-out
    </button>`
          : ``
      }          
      </div>
    </div>
  </header>

  <main class="mdl-layout__content mdl-color--grey-100">
    <div id="messages-card-container" class="mdl-cell mdl-cell--12-col mdl-grid" >
      <!-- Messages container -->
      <div
        id="messages-card"
        class="mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--6-col-tablet mdl-cell--6-col-desktop"
      >
        <div class="mdl-card__supporting-text mdl-color-text--grey-600">
          <div id="messages"></div>
          <form id="message-form" action="#">
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label" >
              <input
                class="mdl-textfield__input"
                type="text"
                id="message"
                autocomplete="off"
                placeholder="Message..."
              />
            </div>
            <button
              id="submit"
              type="submit"
              class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect"
            >
              Send
            </button>
          </form>                   
        </div>
        <p id="error-message">Sign in to your account</p>
      </div>
    </div>
  </main>
</div>`;

  for (const message in store.messages) {
    if (Object.prototype.hasOwnProperty.call(store.messages, message)) {
      displayMessage(
        el,
        message,
        store.messages[message].timestamp,
        store.messages[message].displayName,
        store.messages[message].content,
        store.messages[message].photoURL
      );
    }
  }

  const signInButtonElement = el.querySelector(
    "[data-sign='In']"
  ) as HTMLButtonElement;
  const signOutButtonElement = el.querySelector(
    "[data-sign='Out']"
  ) as HTMLButtonElement;
  const messageFormElement = el.querySelector(
    "#message-form"
  ) as HTMLFormElement;

  signOutButtonElement?.addEventListener("click", comeOut);
  signInButtonElement?.addEventListener("click", signIn);

  const userPicElement = el.querySelector("#user-pic") as HTMLDivElement;

  if (userPicElement) {
    userPicElement.style.backgroundImage =
      `url(` +
      `${addSizeToGoogleProfilePic(store.auth.photoURL as string)}` +
      `)`;
  }

  messageFormElement?.addEventListener("submit", (e) => {
    e.preventDefault();

    const messageInputElement = el.querySelector(
      "#message"
    ) as HTMLInputElement;

    if (!isUserSignedIn()) {
      const errorMessage = el.querySelector("#error-message") as HTMLElement;

      if (!errorMessage) {
        return;
      }

      errorMessage.style.opacity = "1";

      setTimeout(() => {
        errorMessage.style.opacity = "0";
      }, 2000);
    } else if (messageInputElement?.value) {
      createMessage(
        v4(),
        messageInputElement.value,
        store.auth.uid as string,
        store.auth.displayName as string,
        store.auth.photoURL as string
      );
    }
  });
}
