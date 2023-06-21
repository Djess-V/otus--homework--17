import { ref, onChildAdded } from "firebase/database";
import type { AppDispatch } from "../store/store";
import type { IUser } from "../store/initial-state";
import { database } from "../firebase/firebase";

const usersRef = ref(database, "users");

export const addUser = (user: IUser) => {
  const payload = {
    [user.uid]: {
      displayName: user.displayName,
      uid: user.uid,
      photoURL: user.photoURL,
      email: user.email,
    },
  };
  return {
    type: "ADD_USER",
    payload,
  };
};

export const startListeningForUsers = () => {
  return (dispatch: AppDispatch) => {
    onChildAdded(usersRef, (snapshot) => {
      dispatch(addUser(snapshot.val() as IUser));
    });
  };
};
