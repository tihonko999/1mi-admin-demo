import axios, { AxiosError } from "axios";
import styles from "./styles.module.scss";

function showNotification(text: string, type: "info" | "error" = "info"): void {
  const modal = document.createElement("div");
  modal.classList.add(styles.flashComponent);
  let html = "";
  if (type === "error") {
    html = `<div class="${styles.title}">Ошибка</div>`;
    modal.classList.add(styles.__error);
  }
  html += `<div>${text}</div>`;
  modal.insertAdjacentHTML("afterbegin", html);
  const close = () => {
    modal.classList.remove(styles.__visible);
    modal.addEventListener("transitionend", () => modal.remove());
  };
  document.body.append(modal);
  window.setTimeout(() => modal.classList.add(styles.__visible), 0);
  window.setTimeout(close, 5000);
  modal.addEventListener("click", close);
}

export function flash(text: string): void {
  showNotification(text);
}

type ErrorType = {
  errors: string | { [key: string]: string[] };
};

export function error(e: unknown): void {
  // request cancellation is not an error
  if (axios.isCancel(e)) return;
  console.error(e);
  // string
  if (typeof e === "string") return showNotification(e, "error");
  // api error
  // https://github.com/axios/axios/issues/3612
  if (axios.isAxiosError(e)) {
    // using type assertion because isAxiosError does not support gereric type of error
    const err = e as AxiosError<ErrorType>;
    if (!err.response) return;
    let text = "";
    const errors = err.response.data.errors;
    if (typeof errors === "string") {
      text = errors;
    } else {
      for (const value of Object.values(errors)) text += value.join(", ");
    }

    return showNotification(text, "error");
  }
  // basic error
  if (e instanceof Error) return showNotification(e.message, "error");
}
