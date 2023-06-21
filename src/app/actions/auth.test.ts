import type { User } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import type { AppDispatch } from "../store/store";
import { signedIn, signedOut, startListeningToAuthChanges } from "./auth";

jest.mock("firebase/auth", () => {
  const originalModule = jest.requireActual("firebase/auth");

  return {
    __esModule: true,
    ...originalModule,
    onAuthStateChanged: jest.fn(() => "Hello!"),
  };
});

describe("check module auth", () => {
  const user = {
    email: "ageevets.evgeniy@gmail.com",
    displayName: "Евгений Агеевец",
    photoURL:
      "https://lh3.googleusercontent.com/a/AAcHTtfY-AOwvrwvzgJaD9MWKZGzeTLBaDREzNmmTidC=s96-c",
    uid: "YOmpZwH9eFWdBngx6q1bdZ8JrzC2",
  } as User;

  it("check signedIn", () => {
    const result = signedIn(user);

    expect(result.type).toBe("SIGN_IN");
    expect(result.payload.uid).toBe("YOmpZwH9eFWdBngx6q1bdZ8JrzC2");
  });

  it("check signedOut", () => {
    const result = signedOut();

    expect(result.type).toBe("SIGN_OUT");
    expect(result.payload.uid).toBeNull();
  });

  it("check startListeningToAuthChanges", () => {
    const dispath: AppDispatch = jest.fn();

    startListeningToAuthChanges()(dispath);
    expect(onAuthStateChanged).toHaveBeenCalled();
  });
});
