interface Settings {
  hideLikeButton: boolean;
}

class TvingCustomizer {
  private settings: Settings = {
    hideLikeButton: false,
  };

  private readonly LIKE_BUTTON_SELECTOR =
    "#__next > div.styles_Layout__safe-area__id7os.grow.flex.flex-col.justify-stretch.\\[\\&_\\.sports-home-tab\\]\\:flex.\\[\\&_\\.sports-header\\]\\:flex.\\[\\&_\\.sports-main\\]\\:mt-\\[8\\.66rem\\].\\[\\&_\\.sports-main-section\\]\\:mt-0.\\[\\&_\\.sports-player\\]\\:top-\\[8\\.66rem\\].\\[\\&_\\.sports-contents-tab-area\\]\\:landscape\\:h-\\[calc\\(var\\(--sports-contents-main-height\\)_-_8\\.667rem\\)\\].\\[\\&_\\.sports-contents-tab-area\\]\\:landscape\\:sticky.\\[\\&_\\.sports-contents-tab-area\\]\\:landscape\\:top-\\[8\\.667rem\\].\\[\\&_\\.sports-contents-tab\\]\\:top-\\[calc\\(var\\(--sports-player-height\\)_\\+_var\\(--sports-player-companion-banner-height\\)_\\+_8\\.4rem\\)\\].\\[\\&_\\.sports-contents-tab\\]\\:landscape\\:top-0.\\[\\&_\\.sports-inning-tab\\]\\:top-\\[calc\\(var\\(--sports-player-height\\)_\\+_var\\(--sports-player-companion-banner-height\\)_\\+_12\\.5rem\\)\\].\\[\\&_\\.sports-inning-tab\\]\\:landscape\\:top-\\[4\\.2rem\\].\\[\\&_\\.sports-notify-update\\]\\:top-\\[calc\\(var\\(--sports-player-height\\)_\\+_var\\(--sports-player-companion-banner-height\\)_\\+_17\\.7rem\\)\\].\\[\\&_\\.sports-notify-update\\]\\:landscape\\:top-\\[9\\.4rem\\].is-desktop > div.w-full.flex.flex-col.landscape\\:flex-row.relative > div.sports-contents-area.sports-contents-tab-area.flex.flex-col.relative.flex-grow.shrink.bg-black.z-10.min-h-\\[calc\\(100vh-calc\\(var\\(--sports-player-height\\)\\+4\\.167rem\\+8\\.337rem\\)\\)\\].landscape\\:overflow-x-hidden.scrollbar-hidden.landscape\\:overscroll-contain > div > div > div.flex.items-center.shrink-0.right-0.bottom-0.w-full.h-auto.p-\\[0\\.667rem_1\\.333rem_0\\.667rem\\].border-0.border-t.border-\\[\\#404040\\].border-solid.bg-black.transition-height.left-0.fixed.landscape\\:relative.pb-\\[calc\\(0\\.667rem_\\+_var\\(--safe-area-inset-bottom\\)_\\+_var\\(--content-inset-bottom\\)\\)\\] > div.absolute.-top-\\[1\\.333rem\\].right-\\[1\\.333rem\\].-translate-y-full.transition-transform > button";

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

    this.applySettings();
    this.observeDOMChanges();
  }

  private applySettings() {
    const likeButton = document.querySelector(
      this.LIKE_BUTTON_SELECTOR
    ) as HTMLElement;
    if (likeButton) {
      likeButton.style.display = this.settings.hideLikeButton
        ? "none"
        : "block";
    }
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
