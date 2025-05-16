import { useState } from "react";
import { record } from "../utils/record";

export const useRecord = () => {
  const [isRecording, setIsRecording] = useState(false);

  const handleRecord = async () => {
    const recordingStatus = await record();
    setIsRecording(recordingStatus);
  };

  return {
    isRecording,
    handleRecord,
  };
};
