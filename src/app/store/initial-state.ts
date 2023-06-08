export interface IUser {
  displayName: string;
  email: string;
  uid: string;
  photoURL: string;
}

export interface IUsers {
  [uid: string]: IUser;
}

export interface IAuth {
  status: "ANONYMOUS" | "SIGNED_IN";
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  uid: string | null;
}

export interface IMessage {
  displayName: string;
  photoURL: string;
  content: string;
  uid: string;
  timestamp: number;
}

export interface IMessages {
  [mid: string]: IMessage;
}

export interface IState {
  auth: IAuth;
  messages: IMessages;
  users: IUsers;
}

const initialState: IState = {
  auth: {
    status: "ANONYMOUS",
    email: null,
    displayName: null,
    photoURL: null,
    uid: null,
  },
  messages: {},
  users: {},
};

export default initialState;
