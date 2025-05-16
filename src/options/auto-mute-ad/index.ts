import selectors from "../../constant/selectors";

export async function autoMuteOnAd(enabled: boolean) {
  if (!enabled) return;

  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      const adBtn = document.querySelector(selectors.AD_BUTTON);

      if (!adBtn) {
        const unmuteBtn = document.querySelector(
          selectors.UNMUTE_BUTTON
        ) as HTMLButtonElement | null;

        if (unmuteBtn) unmuteBtn.click();
        return;
      }

      const muteBtn = document.querySelector(
        selectors.MUTE_BUTTON
      ) as HTMLButtonElement | null;

      if (muteBtn) muteBtn.click();
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
