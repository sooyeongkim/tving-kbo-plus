import selectors from "../constant/selectors";
import { waitForElement } from "./dom";

const removedStyles = [
  "!w-[var(--live-player-width)]",
  "!h-[var(--live-player-height)]",
  "top-[6rem]",
  "z-20",
];

const addedStyles = ["w-screen", "h-screen", "z-[999]"];

export async function toggleCinemaMode(isWideMode: boolean) {
  const container = await waitForElement(selectors.PLAYER_CONTAINER);
  const wrap = await waitForElement(selectors.PLAYER_WRAP);

  if (!container || !wrap) {
    console.warn("필요한 요소를 찾을 수 없습니다");
    return;
  }

  if (isWideMode) {
    container.classList.remove(...removedStyles);
    container.classList.add(...addedStyles);
    wrap.style.height = "100%";
    wrap.style.maxHeight = "none";
    document.body.style.overflow = "hidden";
  } else {
    container.classList.remove(...addedStyles);
    container.classList.add(...removedStyles);
    wrap.style.height = "";
    wrap.style.maxHeight = "";
    document.body.style.overflow = "";
  }
}
