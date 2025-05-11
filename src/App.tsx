import { useState, useEffect } from "react";
import * as S from "./App.styled";
import { Settings } from "./types";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [settings, setSettings] = useState<Settings>({
    hideLikeButton: false,
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
      <S.SettingRow>
        <S.Label>좋아요 버튼 숨기기</S.Label>
        <S.ToggleButton
          isActive={settings.hideLikeButton}
          onClick={() => handleToggle("hideLikeButton")}
        />
      </S.SettingRow>
    </S.Container>
  );
}

export default App;
