import initial from "./initial";

const div = document.querySelector(".app") as HTMLElement;

if (div) {
  initial(div, "Hello");
}
