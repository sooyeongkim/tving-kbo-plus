import { RecordButton } from "../../components/record";
import { injectAfter, waitForElement } from "../../utils/dom";

export async function addRecordButton(enabled: boolean) {
  if (!enabled) return;
  const space = await waitForElement(".con__space-center");

  if (!space) {
    console.warn("error, no space element");
  }

  injectAfter(<RecordButton />, space as HTMLElement);
}
