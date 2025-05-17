import { getCurrentTime, getTitle, getVideoElement } from "./get";

let mediaRecorder: MediaRecorder | null = null;
let chunks: BlobPart[] = [];
let isRecording = false;

export async function record(): Promise<boolean> {
  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
    isRecording = false;
    return isRecording;
  }

  const video = await getVideoElement();

  if (video === null) {
    alert("비디오 요소를 찾을 수 없습니다.");
    return isRecording;
  }

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  if (ctx === null) {
    console.error("2d 컨텍스트를 가져오는데 실패했습니다.");
    return isRecording;
  }
  const videoStream = canvas.captureStream();
  const audioStream = (video as any).captureStream().getAudioTracks();
  const combinedStream = new MediaStream([
    ...videoStream.getTracks(),
    ...audioStream,
  ]);

  mediaRecorder = new MediaRecorder(combinedStream, {
    mimeType: "video/mp4; codecs=avc1.42E01E,mp4a.40.2",
  });
  chunks = [];

  mediaRecorder.ondataavailable = (e) => {
    chunks.push(e.data);
  };

  mediaRecorder.onstop = async () => {
    const blob = new Blob(chunks, { type: "video/mp4" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    const title = await getTitle();
    const date = getCurrentTime();
    link.download = `${title ? title : "clip"}-${date}.mp4`;
    link.href = url;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    mediaRecorder = null;
    chunks = [];
    isRecording = false;
  };

  const drawFrame = () => {
    if (video.ended || !mediaRecorder || mediaRecorder.state !== "recording")
      return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    requestAnimationFrame(drawFrame);
  };

  mediaRecorder.start();
  drawFrame();
  isRecording = true;
  return isRecording;
}

export function getRecordingStatus(): boolean {
  return isRecording;
}
