import { render } from "./render";
import type { IState } from "./store/initial-state";

describe("render", () => {
  let el: HTMLDivElement;
  const storeI: IState = {
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

  beforeEach(() => {
    el = document.createElement("div");
  });

  it("is a function", () => {
    expect(render).toBeInstanceOf(Function);
  });

  it("rendering check UI", () => {
    render(el, storeI);

    const messages = el.querySelector("#messages") as HTMLDivElement;

    expect(messages.innerHTML).toBe("");
  });

  it("checking message rendering", () => {
    const store2: IState = {
      auth: {
        status: "SIGNED_IN",
        email: "ageevets.evgeniy@gmail.com",
        displayName: "Евгений Агеевец",
        photoURL:
          "https://lh3.googleusercontent.com/a/AAcHTtfY-AOwvrwvzgJaD9MWKZGzeTLBaDREzNmmTidC=s96-c",
        uid: "YOmpZwH9eFWdBngx6q1bdZ8JrzC2",
      },
      messages: {
        "c976cb84-cf23-4a84-8fcc-a2aebbe9d7b6": {
          content: "Hello!",
          displayName: "Евгений Агеевец",
          photoURL:
            "https://lh3.googleusercontent.com/a/AAcHTtfY-AOwvrwvzgJaD9MWKZGzeTLBaDREzNmmTidC=s96-c",
          timestamp: 1686287845764,
          uid: "YOmpZwH9eFWdBngx6q1bdZ8JrzC2",
        },
      },
      users: {
        YOmpZwH9eFWdBngx6q1bdZ8JrzC2: {
          email: "ageevets.evgeniy@gmail.com",
          displayName: "Евгений Агеевец",
          photoURL:
            "https://lh3.googleusercontent.com/a/AAcHTtfY-AOwvrwvzgJaD9MWKZGzeTLBaDREzNmmTidC=s96-c",
          uid: "YOmpZwH9eFWdBngx6q1bdZ8JrzC2",
        },
      },
    };
    render(el, store2);

    const messages1 = el.querySelectorAll(".message-container");

    expect(messages1.length).toBe(1);

    const store3: IState = {
      auth: {
        status: "SIGNED_IN",
        email: "ageevets.evgeniy@gmail.com",
        displayName: "Евгений Агеевец",
        photoURL:
          "https://lh3.googleusercontent.com/a/AAcHTtfY-AOwvrwvzgJaD9MWKZGzeTLBaDREzNmmTidC=s96-c",
        uid: "YOmpZwH9eFWdBngx6q1bdZ8JrzC2",
      },
      messages: {
        "c976cb84-cf23-4a84-8fcc-a2aebbe9d7b6": {
          content: "Hello!",
          displayName: "Евгений Агеевец",
          photoURL:
            "https://lh3.googleusercontent.com/a/AAcHTtfY-AOwvrwvzgJaD9MWKZGzeTLBaDREzNmmTidC=s96-c",
          timestamp: 1686287845764,
          uid: "YOmpZwH9eFWdBngx6q1bdZ8JrzC2",
        },
        "c9e6cb84-5423-4a84-8fcc-a2aehge9d7b6": {
          content: "Hi!",
          displayName: "Евгений Агеевец",
          photoURL:
            "https://lh3.googleusercontent.com/a/AAcHTtfY-AOwvrwvzgJaD9MWKZGzeTLBaDREzNmmTidC=s96-c",
          timestamp: 1686287885764,
          uid: "YOmpZwH9eFWdBngx6q1bdZ8JrzC2",
        },
      },
      users: {
        YOmpZwH9eFWdBngx6q1bdZ8JrzC2: {
          email: "ageevets.evgeniy@gmail.com",
          displayName: "Евгений Агеевец",
          photoURL:
            "https://lh3.googleusercontent.com/a/AAcHTtfY-AOwvrwvzgJaD9MWKZGzeTLBaDREzNmmTidC=s96-c",
          uid: "YOmpZwH9eFWdBngx6q1bdZ8JrzC2",
        },
      },
    };
    render(el, store3);

    const messages2 = el.querySelectorAll(".message-container");

    expect(messages2.length).toBe(2);
  });
});
