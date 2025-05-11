import { useState, useEffect } from "react";

interface TvingSettings {
  hideLikeButton: boolean;
}

function App() {
  const [settings, setSettings] = useState<TvingSettings>({
    hideLikeButton: false,
  });

  useEffect(() => {
    // 저장된 설정 불러오기
    chrome.storage.sync.get("tvingSettings", (result) => {
      if (result.tvingSettings) {
        setSettings(result.tvingSettings);
      }
    });
  }, []);

  const handleToggle = (key: keyof TvingSettings) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key],
    };
    setSettings(newSettings);
    chrome.storage.sync.set({ tvingSettings: newSettings });
  };

  return (
    <div className="App" style={{ width: "300px", padding: "16px" }}>
      <h1 style={{ fontSize: "18px", marginBottom: "16px" }}>
        TVING KBO PLUS 설정
      </h1>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
      >
        <label style={{ flex: 1 }}>좋아요 버튼 숨기기</label>
        <button
          onClick={() => handleToggle("hideLikeButton")}
          style={{
            padding: "4px 8px",
            backgroundColor: settings.hideLikeButton ? "#4CAF50" : "#ccc",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {settings.hideLikeButton ? "켜짐" : "꺼짐"}
        </button>
      </div>
    </div>
  );
}

export default App;
