import { useState } from "react";
import { toggleCinemaMode } from "../../utils/cinema-mode";
import { isFullScreen } from "../../utils/is";
import { useEventListener } from "../../hooks/use-event-listener";

export const CinemaModeButton = () => {
  const [isWideMode, setIsWideMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEventListener(document, "fullscreenchange", () => {
    setIsFullscreen(isFullScreen());
  });

  const handleOnClick = () => {
    setIsWideMode((prev) => {
      toggleCinemaMode(!prev);
      return !prev;
    });
  };

  if (isFullscreen) {
    return null;
  }

  return (
    <button
      className="control-button"
      type="button"
      aria-label={isWideMode ? "좁은 화면 모드" : "넓은 화면 모드"}
      onClick={handleOnClick}
      title={isWideMode ? "좁은 화면 모드" : "넓은 화면 모드"}
    >
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        {!isWideMode ? (
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 8h20v12H4V8zm2 2h16v8H6v-8z"
            fill="#fff"
          />
        ) : (
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 10h20v8H4v-8zm2 2h16v4H6v-4z"
            fill="#fff"
          />
        )}
      </svg>
    </button>
  );
};
