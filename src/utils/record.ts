import { getCurrentTime, getTitle, getVideoElement } from "./get";

let mediaRecorder: MediaRecorder | null = null;
let chunks: BlobPart[] = [];
let isRecording = false;

/**
 * 비디오 재생이 끝나면 자동으로 녹화를 종료하고 저장합니다.
 * 우선 WebM(VP9/Opus) ⇒ WebM(VP8/Opus) ⇒ MP4(H.264/AAC) 순으로 지원 여부를 탐색합니다.
 * Safari 등 WebM 미지원 환경에서는 최종적으로 MP4를 사용합니다.
 */
export async function record(): Promise<boolean> {
  // 이미 녹화 중이면 수동 중지(토글 기능)
  if (mediaRecorder && mediaRecorder.state === "recording") {
    mediaRecorder.stop();
    isRecording = false;
    return isRecording;
  }

  const video = await getVideoElement();
  if (!video) {
    alert("비디오 요소를 찾을 수 없습니다.");
    return isRecording;
  }

  // Canvas 준비
  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    console.error("2D 컨텍스트를 가져오지 못했습니다.");
    return isRecording;
  }

  // 스트림 결합 (화면 + 원본 오디오)
  const videoStream = canvas.captureStream();
  const audioTracks = (video as any).captureStream().getAudioTracks();
  const combinedStream = new MediaStream([
    ...videoStream.getTracks(),
    ...audioTracks,
  ]);

  /* MIME 타입 우선순위 */
  const candidateTypes = [
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/mp4;codecs=avc1.640028,mp4a.40.2", // High@L4 + AAC LC
  ];
  const mimeType =
    candidateTypes.find((t) => MediaRecorder.isTypeSupported(t)) ||
    "video/webm";

  // MediaRecorder 초기화
  mediaRecorder = new MediaRecorder(combinedStream, { mimeType });
  chunks = [];

  mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

  // 비디오 종료 시 자동 중지
  const handleEnded = () => {
    if (mediaRecorder?.state === "recording") mediaRecorder.stop();
  };
  video.addEventListener("ended", handleEnded, { once: true });

  mediaRecorder.onstop = async () => {
    video.removeEventListener("ended", handleEnded);

    const blob = new Blob(chunks, { type: mimeType.split(";")[0] });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    const title = await getTitle();
    const date = getCurrentTime();
    const ext = mimeType.startsWith("video/webm") ? "webm" : "mp4";
    link.download = `${title || "clip"}-${date}.${ext}`;
    link.href = url;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 상태 초기화
    mediaRecorder = null;
    chunks = [];
    isRecording = false;
  };

  // 화면 캡처 루프
  const drawFrame = () => {
    if (
      video.ended ||
      video.paused ||
      !mediaRecorder ||
      mediaRecorder.state !== "recording"
    )
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
