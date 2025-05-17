import selectors from "../../constant/selectors";

export async function hideLikeButton(enabled: boolean) {
  if (!enabled) return;

  const style = document.createElement("style");
  style.textContent = `
    ${selectors.LIKE_BUTTON} {
      display: none !important;
    }
  `;
  document.head.appendChild(style);

  return () => {
    document.head.removeChild(style);
  };
}
