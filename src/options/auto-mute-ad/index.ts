import selectors from "../../constant/selectors";
import { getVideoElement } from "../../utils/get";

export async function autoMuteOnAd(enabled: boolean) {
  if (!enabled) return;

  const observer = new MutationObserver(async (mutations) => {
    mutations.forEach(async () => {
      const video = await getVideoElement();
      if (!video) return;

      const adBtn = document.querySelector(selectors.AD_BUTTON);

      if (!adBtn) {
        video.muted = false;
        return;
      }

      video.muted = true;
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
