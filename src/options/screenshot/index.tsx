import { ScreenshotButton } from "../../components/screenshot";
import { waitForElement, injectAfter } from "../../utils/dom";
import selectors from "../../constant/selectors";
export async function addScreenshotButton(enabled: boolean) {
  if (!enabled) return;

  const space = await waitForElement(selectors.SPACE);

  if (!space) {
    console.warn("error, no space element");
    return;
  }

  injectAfter(<ScreenshotButton />, space);
}
