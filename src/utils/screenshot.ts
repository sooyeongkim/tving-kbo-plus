export function screenshot(): void {
  const video: HTMLVideoElement | null = document.querySelector(
    '[id^="tving-player"]'
  );
  if (video === null) {
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");

  if (ctx === null) {
    console.error("Failed to get 2d context, cannot take a screenshot");
    return;
  }

  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const image = canvas.toDataURL("image/png");

  const link = document.createElement("a");
  const title = document.querySelector(
    "#__next > div > div > div > section > div > h1"
  );
  const date = new Date().toLocaleDateString("ko-KR").replace(/\./g, "").trim();
  link.download = `${title?.innerHTML || "screenshot"}-${date}.png`;
  link.href = image;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
