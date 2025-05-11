import { Settings } from "./types";

class TvingCustomizer {
  private settings: Settings = {
    hideLikeButton: false,
    hideHeader: false,
  };

  private readonly hideElements = {
    LIKE_BUTTON: ".group\\/heart",
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
      const elements = Object.values(this.hideElements).map((selector) =>
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
        this.hideElements.LIKE_BUTTON
      ) as HTMLElement;
      if (likeButton) {
        likeButton.style.display = this.settings.hideLikeButton
          ? "none"
          : "block";
      }

      this.debounceTimer = null;
    }, 50);
  }

  private observeDOMChanges() {
    const observer = new MutationObserver((mutations) => {
      const shouldUpdate = mutations.some((mutation) => {
        const target = mutation.target as HTMLElement;
        return Object.values(this.hideElements).some((selector) =>
          target.matches(selector)
        );
      });

      if (shouldUpdate) {
        this.waitForElementsAndApply();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
}

new TvingCustomizer();
