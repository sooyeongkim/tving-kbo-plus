import { RecordButton } from "../../components/record";
import selectors from "../../constant/selectors";
import { injectAfter, waitForElement } from "../../utils/dom";

export async function addRecordButton(enabled: boolean) {
  if (!enabled) return;

  const space = await waitForElement(selectors.SPACE);

  if (!space) {
    console.warn("error, no space element");
    return;
  }

  injectAfter(<RecordButton />, space);
}
