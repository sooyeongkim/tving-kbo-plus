import selectors from "../../constant/selectors";
import { waitForElement } from "../../utils/dom";

export async function hideLikeButton(enabled: boolean) {
  if (!enabled) return;

  const likeButton = await waitForElement(selectors.LIKE_BUTTON);

  if (!likeButton) {
    console.warn("error, no like button");
    return;
  }

  likeButton.style.display = "none";
}
