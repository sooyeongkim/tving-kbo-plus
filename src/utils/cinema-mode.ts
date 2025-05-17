import selectors from "../constant/selectors";
import { waitForElement } from "./dom";

let originalClassName = "";

export async function toggleCinemaMode(isWideMode: boolean) {
  const container = await waitForElement(selectors.PLAYER_CONTAINER);
  const wrap = await waitForElement(selectors.PLAYER_WRAP);

  if (!container || !wrap) {
    console.warn("필요한 요소를 찾을 수 없습니다");
    return;
  }

  if (isWideMode) {
    originalClassName = container.className;
    container.className =
      "player-container fixed top-0 left-0 w-screen h-screen z-[999]";
    wrap.style.height = "100%";
    wrap.style.maxHeight = "none";
    document.body.style.overflow = "hidden";
  } else {
    container.className = originalClassName;
    wrap.style.height = "";
    wrap.style.maxHeight = "";
    document.body.style.overflow = "";
  }
}
