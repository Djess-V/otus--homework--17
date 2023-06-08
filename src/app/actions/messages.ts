import { ref, onChildAdded, update, remove, get } from "firebase/database";
import type { AppDispatch } from "../store/store";
import type { IMessage, IMessages } from "../store/initial-state";
import { database } from "../firebase/firebase";
import { isUserSignedIn } from "../service/functions";

const messagesRef = ref(database, "messages");

export const addMessage = (
  mid: string,
  { content, uid, timestamp, displayName, photoURL }: IMessage
) => {
  const payload = {
    [mid]: {
      displayName,
      photoURL,
      content,
      uid,
      timestamp,
    },
  };

  return {
    type: "ADD_MESSAGE",
    payload,
  };
};

export const addMessages = (messages: IMessages) => {
  return {
    type: "ADD_MESSAGES",
    payload: messages,
  };
};

export const removeMessage = (mid: string) => {
  return {
    type: "REMOVE_MESSAGE",
    payload: mid,
  };
};

export const clearMessages = () => {
  return {
    type: "CLEAR_MESSAGES",
  };
};

export const createMessage = (
  mid: string,
  content: string,
  uid: string,
  displayName: string,
  photoURL: string
) => {
  const message = {
    displayName,
    photoURL,
    content,
    uid,
    timestamp: Date.now(),
  };

  update(ref(database, `messages/${mid}`), message);
};

export const destroyMessage = (mid: string) => {
  remove(ref(database, `messages/${mid}`));
};

export const startListeningForMessages = () => {
  return (dispatch: AppDispatch) => {
    onChildAdded(messagesRef, (snapshot) => {
      if (isUserSignedIn()) {
        dispatch(addMessage(snapshot.key as string, snapshot.val()));
      }
    });
  };
};

export async function loadMessages(): Promise<any> {
  try {
    const snapshot = await get(messagesRef);

    return snapshot.val();
  } catch (e) {
    return null;
  }
}
