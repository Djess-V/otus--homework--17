import { onChildAdded, get, update } from "firebase/database";
import type { AppDispatch } from "../store/store";
import {
  createMessage,
  clearMessages,
  loadMessages,
  startListeningForMessages,
} from "./messages";

jest.mock("firebase/database", () => {
  const originalModule = jest.requireActual("firebase/database");

  return {
    __esModule: true,
    ...originalModule,
    onChildAdded: jest.fn(() => "Hello!"),
    get: jest.fn((p) => ({
      val: () => "Hello!",
    })),
    update: jest.fn(() => "Hi!"),
  };
});

describe("check module messages", () => {
  const messages = {
    mid: "c976cb84-cf23-4a84-8fcc-a2aebbe9d7b6",
    content: "Hello!",
    displayName: "Евгений Агеевец",
    photoURL:
      "https://lh3.googleusercontent.com/a/AAcHTtfY-AOwvrwvzgJaD9MWKZGzeTLBaDREzNmmTidC=s96-c",
    timestamp: 1686287845764,
    uid: "YOmpZwH9eFWdBngx6q1bdZ8JrzC2",
  };

  it("check clearMessages", () => {
    const result = clearMessages();

    expect(result.type).toBe("CLEAR_MESSAGES");
  });

  it("check createMessage", () => {
    createMessage(
      messages.mid,
      messages.content,
      messages.uid,
      messages.displayName,
      messages.photoURL
    );

    expect(update).toHaveBeenCalled();
  });

  it("check loadMessages", async () => {
    const result = await loadMessages();

    expect(get).toHaveBeenCalled();
    expect(result).toBe("Hello!");
  });

  it("check startListeningForMessages", () => {
    const dispath: AppDispatch = jest.fn();

    startListeningForMessages()(dispath);
    expect(onChildAdded).toHaveBeenCalled();
  });
});
