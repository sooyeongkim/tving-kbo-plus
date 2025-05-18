import selectors from "./constant/selectors";
import { addCinemaButton } from "./options/cinema-mode";
import { hideLikeButton } from "./options/heart-button";
import { addRecordButton } from "./options/record";
import { addScreenshotButton } from "./options/screenshot";
import { Settings } from "./types";

class Content {
  private settings: Settings = {
    hideLikeButton: false,
    autoMuteOnAd: false,
    addScreenshot: false,
    addRecord: false,
    addCinemaMode: false,
  };

  constructor() {
    console.log("initialize");
    this.initialize();
  }

  private async initialize() {
    try {
      const settings = await chrome.storage.sync.get("tvingSettings");
      if (!settings || !settings.tvingSettings) {
        console.error("error-no-settings");
        return;
      }

      this.settings = settings.tvingSettings;
      this.waitForVideoElement();
    } catch (e) {
      console.log(e);
    }
  }

  private waitForVideoElement() {
    const observer = new MutationObserver((_mutations, obs) => {
      const videoElement = document.querySelector(selectors.PLAYER_CONTAINER);
      if (videoElement) {
        obs.disconnect();
        this.applySettings();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  private applySettings() {
    hideLikeButton(this.settings.hideLikeButton);
    addScreenshotButton(this.settings.addScreenshot);
    addRecordButton(this.settings.addRecord);
    addCinemaButton(this.settings.addCinemaMode);
  }
}

new Content();
