import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import Header from "../components/Header";
import "./video.css"; // Import CSS file for styling
import MainLayout from "./MainLayout";
import Footer from "../components/Footer";
function VideoModeScreen() {
  const webcamRef = useRef(null);
  const videoWrapperRef = useRef(null);

  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [recordedVideoUrl, setRecordedVideoUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [resolution, setResolution] = useState({ width: 1280, height: 720});
  const [selectedFrameRate, setSelectedFrameRate] = useState(30); // Default frame rate
  const [deviceId, setDeviceId] = useState(null);


  const handleResolutionChange = (event) => {
    const selectedResolution = JSON.parse(event.target.value);
    setResolution(selectedResolution);
  };

  const handleFrameRate = (event) => {
    setSelectedFrameRate(event.target.value);
  };

  useEffect(() => {
    const handleResize = () => {
      const { offsetWidth } = videoWrapperRef.current;
      webcamRef.current.video.width = offsetWidth;
      webcamRef.current.video.height =
        (offsetWidth * resolution.height) / resolution.width;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [resolution]);

  const resolutions = [
    { value: { width: 640, height: 480 }, label: "640" },
    { value: { width: 1280, height: 720 }, label: "1280" },
    // Add more resolutions as needed
  ];

  useEffect(() => {
    if (recordedChunks.length > 0 && !isRecording) {
      const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
      console.log(recordedBlob, "RECORDED BLOB");
      const videoUrl = URL.createObjectURL(recordedBlob);
      setRecordedVideoUrl(videoUrl);
      downloadRecordedVideo();
    }
  }, [recordedChunks, isRecording]);

  const handleStartRecording = () => {
    console.log("START");
    const stream = webcamRef.current.video.srcObject;
    mediaRecorderRef.current = new MediaRecorder(stream);
    mediaRecorderRef.current.ondataavailable = handleDataAvailable;
    mediaRecorderRef.current.start();
    setIsRecording(true);
    setRecordedChunks([]);
  };

  const handleStopRecording = () => {
    console.log("STOOOPP");
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      console.log("INSIEEEEEE");
      setRecordedChunks((prev) => [...prev, event.data]);
    }
  };

  const downloadRecordedVideo = () => {
    if (recordedVideoUrl) {
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = recordedVideoUrl;
      a.download = "recorded_video.webm";
      a.click();
      window.URL.revokeObjectURL(recordedVideoUrl);
    }
  };

  const retake = () => {
    setRecordedChunks([]);
    setRecordedVideoUrl(null);
    setIsRecording(false);
  };

  const uploadBlob = () => {
    const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
    console.log(recordedBlob, "Upload BLOB");
  };
  //   const videoConstraints = {
  //     width: 1280,
  //     height: 720,
  //     facingMode: "user", // or "environment" for the rear camera
  //   };

  const handleSwitchCamera = () => {
    navigator.mediaDevices.enumerateDevices().then(devices => {
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      if (videoDevices.length > 1) {
        const nextDeviceId = videoDevices.find(device => device.deviceId !== deviceId)?.deviceId || videoDevices[0].deviceId;
        setDeviceId(nextDeviceId);
      }
    });
  };

console.log({...resolution,frameRate:selectedFrameRate},"CHEKKKKKKK",selectedFrameRate)


  return (
    <>
      <MainLayout>
        {!recordedVideoUrl && (
          <div
            ref={videoWrapperRef}
            className="flex flex-col justify-center items-center"
            style={{ width: "100%", height: "80vh", backgroundColor:"#000000" }}
          >
            <Webcam
              ref={webcamRef}
              width="100%"
            //   height="auto"
              className="Webcam-view"
              videoConstraints={{...resolution,frameRate:selectedFrameRate,deviceId:deviceId}}
            />
            <div className="record-button-view">
              {isRecording ? (
                <button
                  onClick={handleStopRecording}
                  className="record-button"
                  id="recordButton"
                >
                  Stop Recording
                </button>
              ) : (
                <button
                  onClick={handleStartRecording}
                  className="record-button"
                  id="recordButton"
                >
                  Start Recording
                </button>
              )}
            </div>
          </div>
        )}
        {recordedVideoUrl && (
          <div
            className="webcam-container"
            style={{ backgroundColor: "#000000" }}
          >
            <video
              controls
              // style={{  width: "50%" ,
              // height: "auto" }}
              // className="render-video"
              style={{ width: '50%', height: 'auto', maxWidth: '100%' }}

              src={recordedVideoUrl}
            />

            <div className="record-button-view flex flex-row justify-center items-center">
              <button
                onClick={() => retake()}
                className="record-button mr-5"
                id="recordButton"
              >
                Retake
              </button>

              <button
                onClick={uploadBlob}
                className="record-button"
                id="recordButton"
              >
                Upload
              </button>
            </div>
          </div>
        )}
        <Footer
          resolutions={resolutions}
          onChangeResolution={handleResolutionChange}
          onChangeFrameRate={handleFrameRate}
          selectedFrameRate={selectedFrameRate}
          selectedResolution={ JSON.stringify(resolution)}
          handleSwitchCamera={handleSwitchCamera}
        />
      </MainLayout>
    </>
  );
}

export default VideoModeScreen;
