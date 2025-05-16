import { ScreenshotButton } from "../../components/screenshot";
import { waitForElement, injectAfter } from "../../utils/dom";

export async function addScreenshotButton(enabled: boolean) {
  if (!enabled) return;

  const space = await waitForElement(".con__space-center");

  if (!space) {
    console.warn("error, no space element");
  }

  injectAfter(<ScreenshotButton />, space as HTMLElement);
}
