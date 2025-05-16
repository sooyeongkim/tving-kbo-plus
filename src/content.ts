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
  };

  constructor() {
    console.log("initialize");
    this.initialize();
  }

  private async initialize() {
    chrome.storage.sync
      .get("tvingSettings")
      .then((settings) => {
        if (!settings) {
          console.error("error-no-settings");
        }

        this.settings = settings.tvingSettings;
        this.applySettings();
      })
      .catch((e) => console.log(e));
  }

  private applySettings() {
    console.log("applySettings");
    hideLikeButton(this.settings.hideLikeButton);
    addScreenshotButton(this.settings.addScreenshot);
    addRecordButton(this.settings.addRecord);
  }
}

new Content();
