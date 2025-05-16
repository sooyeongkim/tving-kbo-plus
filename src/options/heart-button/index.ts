import selectors from "../../constant/selectors";
import { waitForElement } from "../../utils/dom";

export async function hideLikeButton(enabled: boolean) {
  if (!enabled) return;

  const likeButton = (await waitForElement(
    selectors.LIKE_BUTTON
  )) as HTMLElement;

  likeButton.style.display = "none";
}
