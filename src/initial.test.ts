import initial from "./initial";

describe("initial", () => {
  const div = document.createElement("div");

  it("is a function", () => {
    expect(initial).toBeInstanceOf(Function);
  });

  it("auditing", () => {
    initial(div, "World");

    expect(div.innerHTML).toBe("World");
  });
});
