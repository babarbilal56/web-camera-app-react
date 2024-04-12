import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import Header from "../components/Header";
import "./video.css"; // Import CSS file for styling
import MainLayout from "./MainLayout";
import Footer from "../components/Footer";
function DocModeScreen() {
  const webcamRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const [readyToTakePhoto, setReadyToTakePhoto] = useState(false);
  const mediaRecorderRef = useRef(null);
  const [resolution, setResolution] = useState({ width: 1280, height: 720 });
  const [selectedFrameRate, setSelectedFrameRate] = useState(30); // Default frame rate
  const [deviceId, setDeviceId] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const openCvURL = "https://docs.opencv.org/4.7.0/opencv.js";
  const [loadedOpenCV, setLoadedOpenCV] = useState(false);


  const handleResolutionChange = (event) => {
    const selectedResolution = JSON.parse(event.target.value);

    console.log(selectedResolution,"selectedResolution")
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

  const captureImage = () => {
    const scanner = new jscanify();   
    const imageSrc = webcamRef.current.getScreenshot();

    if (imageSrc) {

      loadOpenCv(() => {
       
      // Create a new image element
      const newImg = new Image();
  
      // Set the source of the image to the captured photo
      newImg.src = imageSrc;
      // const paperWidth = 500;
      // const paperHeight = 1000;
      // Once the image is loaded, process it with jscanify
      newImg.onload = function () {

        const resultCanvas = document.createElement('canvas');
           // Set the dimensions of the canvas to match the dimensions of the image
      resultCanvas.width = newImg.width;
      resultCanvas.height = newImg.height;
   // Draw the image onto the canvas
   const ctx = resultCanvas.getContext('2d');
   ctx.drawImage(newImg, 0, 0);
   const scannedCanvas = scanner.extractPaper(resultCanvas, newImg.width, newImg.height);

        // const resultCanvas = scanner.extractPaper(newImg, paperWidth, paperHeight);
        const imageURL = scannedCanvas.toDataURL();

        fetch(imageURL)
        .then((res) => res.blob())
        .then((blob) => {
          setCapturedImage(blob);
        })
        .catch((error) => {
          console.error("Error capturing image:", error);
        });

        // You can use resultImage to display the scanned document
        // For example, append it to a container
      };
      });
    
    }
  };


  const loadOpenCv = (onComplete) => {
    const isScriptPresent = !!document.getElementById("open-cv");
    if (isScriptPresent || loadedOpenCV) {
      setLoadedOpenCV(true);
      onComplete();
    } else {
      const script = document.createElement("script");
      script.id = "open-cv";
      script.src = openCvURL;

      script.onload = function () {
        setTimeout(function () {
          onComplete();
        }, 1000);
        setLoadedOpenCV(true);
      };
      document.body.appendChild(script);
    }
  };

  const retakeImage = () => {
    setCapturedImage(null);
  };

  const uploadBlob = () => {
    console.log(capturedImage, "Upload BLOB");
  };

  const handleSwitchCamera = () => {
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      if (videoDevices.length > 1) {
        const nextDeviceId =
          videoDevices.find((device) => device.deviceId !== deviceId)
            ?.deviceId || videoDevices[0].deviceId;
        setDeviceId(nextDeviceId);
      }
    });
  };

  const handleWebcamLoaded = () => {
    setReadyToTakePhoto(true);
  };

  return (
    <>
      <MainLayout>
        {!capturedImage && (
          <div
            ref={videoWrapperRef}
            className="flex flex-col justify-center items-center"
            style={{
              width: "100%",
              height: "80vh",
              backgroundColor: "#000000",
            }}
          >
            <div
              className={
                readyToTakePhoto
                  ? "ready-to-take-photo"
                  : "ready-to-take-photo-danger"
              }
            >
              <p>Ready to take photo</p>
            </div>

            <Webcam
              ref={webcamRef}
              width="100%"
              //   height="auto"
              screenshotFormat="image/jpeg"
              audio={false}
              className="Webcam-view"
              videoConstraints={{
                ...resolution,
                deviceId: deviceId,
              }}
              onUserMedia={() => handleWebcamLoaded()}
            />
      <GuidelineBox width="50%" height="50%" />

            <div className="record-button-view">
              {!capturedImage && (
                // <button
                //   onClick={captureImage}
                //   className="record-button"
                //   id="recordButton"
                // >
                //   Capture Image
                // </button>

                <button class="camera-button" onClick={captureImage}>
                  <span class="camera-icon"></span>
                </button>
              )}
            </div>
          </div>
        )}
        {capturedImage && (
          <div
            className="webcam-container"
            style={{ backgroundColor: "#000000" }}
          >
            <img
              src={URL.createObjectURL(capturedImage)}
              alt="Captured"
              style={{ width: "50%", height: "auto", maxWidth: "100%" }}
            />

            <div className="record-button-view flex flex-row justify-center items-center">
              <button
                onClick={() => retakeImage()}
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
          selectedResolution={JSON.stringify(resolution)}
          handleSwitchCamera={handleSwitchCamera}
          mode="Doc Scan"
        />
      </MainLayout>
    </>
  );
}

export default DocModeScreen;
function GuidelineBox({ width, height }) {
  return (
    <div
      className="vertical-box"
      style={{ width: width, height: height }}
    ></div>
  );
}
