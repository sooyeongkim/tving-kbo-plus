import { Settings } from "./types";

class TvingCustomizer {
  private settings: Settings = {
    hideLikeButton: false,
    autoMuteOnAd: false,
  };

  private readonly selectors = {
    LIKE_BUTTON: ".group\\/heart",
    AD_BUTTON: ".PcAdvertisementLinkButton_advertisementLinkButton__tyCiu",
    MUTE_BUTTON: 'button[aria-label="음소거"]',
    UNMUTE_BUTTON: 'button[aria-label="음소거 해제"]',
  };

  private debounceTimer: number | null = null;
  private isInitialized = false;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    const result = await chrome.storage.sync.get("tvingSettings");
    if (result.tvingSettings) {
      this.settings = result.tvingSettings;
    }

    chrome.storage.onChanged.addListener((changes) => {
      if (changes.tvingSettings) {
        this.settings = changes.tvingSettings.newValue;
        this.applySettings();
      }
    });

    this.waitForElementsAndApply();
  }

  private waitForElementsAndApply() {
    if (this.isInitialized) return;

    const checkElements = () => {
      const elements = Object.values(this.selectors).map((selector) =>
        document.querySelector(selector)
      );

      if (elements.some((element) => element)) {
        this.isInitialized = true;
        this.applySettings();
        this.observeDOMChanges();
      } else {
        requestAnimationFrame(checkElements);
      }
    };

    requestAnimationFrame(checkElements);
  }

  private applySettings() {
    if (this.debounceTimer) {
      window.clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = window.setTimeout(() => {
      const likeButton = document.querySelector(
        this.selectors.LIKE_BUTTON
      ) as HTMLElement;
      if (likeButton) {
        likeButton.style.display = this.settings.hideLikeButton
          ? "none"
          : "block";
      }

      this.debounceTimer = null;
    }, 100);

    if (this.settings.autoMuteOnAd) {
      this.tryAutoMuteOnAd();
    }
  }

  private tryAutoMuteOnAd() {
    const adBtn = document.querySelector(this.selectors.AD_BUTTON);

    if (!adBtn) {
      const unmuteBtn = document.querySelector(
        this.selectors.UNMUTE_BUTTON
      ) as HTMLButtonElement | null;

      if (unmuteBtn) unmuteBtn.click();
      return;
    }

    const muteBtn = document.querySelector(
      this.selectors.MUTE_BUTTON
    ) as HTMLButtonElement | null;

    if (muteBtn) muteBtn.click();
  }

  private observeDOMChanges() {
    const observer = new MutationObserver(() => {
      this.applySettings();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
}

new TvingCustomizer();
