import { useState, useEffect } from "react";
import * as S from "./App.styled";
import { Settings } from "./types";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [settings, setSettings] = useState<Settings>({
    hideLikeButton: false,
    autoMuteOnAd: false,
    addScreenshot: false,
    addRecord: false,
  });

  useEffect(() => {
    chrome.storage.sync.get("tvingSettings", (result) => {
      if (result.tvingSettings) {
        setSettings(result.tvingSettings);
      }
      setLoading(false);
    });
  }, []);

  const handleToggle = (key: keyof Settings) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key],
    };
    setSettings(newSettings);
    chrome.storage.sync.set({ tvingSettings: newSettings });
  };

  if (loading) return <></>;

  return (
    <S.Container>
      <S.Title>TVING KBO PLUS</S.Title>
      <S.Notice>설정 변경 후 새로고침해야 적용됩니다.</S.Notice>
      <S.SettingRow>
        <S.Label>좋아요 버튼 숨기기</S.Label>
        <S.ToggleButton
          isActive={settings.hideLikeButton}
          onClick={() => handleToggle("hideLikeButton")}
        />
      </S.SettingRow>
      {/* <S.SettingRow>
        <S.Label>광고시 자동 음소거</S.Label>
        <S.ToggleButton
          isActive={settings.autoMuteOnAd}
          onClick={() => handleToggle("autoMuteOnAd")}
        />
      </S.SettingRow> */}
      <S.SettingRow>
        <S.Label>스크린샷 활성화</S.Label>
        <S.ToggleButton
          isActive={settings.addScreenshot}
          onClick={() => handleToggle("addScreenshot")}
        />
      </S.SettingRow>
      <S.SettingRow>
        <S.Label>녹화 활성화</S.Label>
        <S.ToggleButton
          isActive={settings.addRecord}
          onClick={() => handleToggle("addRecord")}
        />
      </S.SettingRow>
    </S.Container>
  );
}

export default App;
