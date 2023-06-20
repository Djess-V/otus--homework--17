import { emoji } from "./constants";

export function addSizeToGoogleProfilePic(url: string) {
  if (url.indexOf("googleusercontent.com") !== -1 && url.indexOf("?") === -1) {
    return `${url}?sz=150`;
  }
  return url;
}

function createAndInsertMessage(
  messageListElement: HTMLDivElement,
  id: string,
  timestamp: number
) {
  const container = document.createElement("div");
  container.innerHTML = `<div class="message-container"><div class="spacing"><div class="pic"></div></div><div class="message"></div><div class="name"></div></div>`;
  const div = container.firstChild as HTMLDivElement;
  div.setAttribute("id", id);

  timestamp = timestamp || Date.now();
  div.setAttribute("timestamp", String(timestamp));

  const existingMessages = messageListElement.children;
  if (existingMessages.length === 0) {
    messageListElement.appendChild(div);
  } else {
    let messageListNode = existingMessages[0];

    while (messageListNode) {
      const messageListNodeTime = messageListNode.getAttribute("timestamp");

      if (Number(messageListNodeTime) > timestamp) {
        break;
      }

      messageListNode = messageListNode.nextSibling as HTMLDivElement;
    }

    messageListElement.insertBefore(div, messageListNode);
  }

  return div;
}

function parseSmiles(message: string) {
  let parsedMessage = message;
  emoji.forEach((item) => {
    parsedMessage = parsedMessage.replace(
      item.represent,
      `<img src=${item.image} alt="Emoji" width=18px heght=18px/>`
    );
  });

  return parsedMessage;
}

export function displayMessage(
  el: HTMLDivElement,
  id: string,
  timestamp: number,
  name: string,
  text: string,
  picUrl: string
) {
  const messageListElement = el.querySelector("#messages") as HTMLDivElement;

  const div = createAndInsertMessage(messageListElement, id, timestamp);

  // profile picture
  if (picUrl) {
    const picDiv = div.querySelector(".pic") as HTMLDivElement;
    picDiv.style.backgroundImage = `url(${addSizeToGoogleProfilePic(picUrl)})`;
  }

  const nameDiv = div.querySelector(".name") as HTMLDivElement;
  nameDiv.textContent = name;
  const messageElement = div.querySelector(".message") as HTMLDivElement;

  if (text) {
    messageElement.innerHTML = parseSmiles(text);
    messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, "<br>");
  }

  setTimeout(() => {
    div.classList.add("visible");
  }, 1);

  messageListElement.scrollTop = messageListElement.scrollHeight;

  const messageInputElement = el.querySelector("#message") as HTMLInputElement;

  messageInputElement.focus();
}
