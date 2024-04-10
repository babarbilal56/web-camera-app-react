import { useEffect, useRef, useState } from "react";
import "./scanner.css";
import logo from "../img/paper-high.png"; // with import
import logo2 from "../img/2.jpeg"; // with import
import logo4 from "../img/4.jpeg"; // with import
import Webcam from 'react-webcam';

const images = [{ src: logo }, { src: logo2 }, { src: logo4 }];
export default function Scanner() {
  const webcamRef = useRef(null);

  const containerRef = useRef(null);
  const openCvURL = "https://docs.opencv.org/4.7.0/opencv.js";

  const [loadedOpenCV, setLoadedOpenCV] = useState(false);
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [Imagevalue, setResultImage] = useState(null);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    const scanner = new jscanify();
    loadOpenCv(() => {
      if (selectedImage) {
        containerRef.current.innerHTML = "";
        const newImg = document.createElement("img");
        newImg.src = selectedImage.src;

        console.log(newImg,"newImg",logo)

        newImg.onload = function () {
          const resultCanvas = scanner.extractPaper(newImg, 386, 500);
          // containerRef.current.append(resultCanvas);

          // const resultImage = new Image();

          // // Set the src attribute of the image to the data URL of the canvas
          // resultImage.src = resultCanvas.toDataURL();

          const imageURL = resultCanvas.toDataURL();

          
          setResultImage(imageURL);

          console.log(imageURL,"resultImage")



          // const highlightedCanvas = scanner.highlightPaper(newImg);

          // console.log(highlightedCanvas,"highlig")
          // containerRef.current.append(highlightedCanvas);
        };
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImage]);

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


  const capturePhoto = () => {

    const scanner = new jscanify();
    loadOpenCv(() => {
     
    const imageSrc = webcamRef.current.getScreenshot();

    // Create a new image element
    const newImg = new Image();

    // Set the source of the image to the captured photo
    newImg.src = imageSrc;

    // Once the image is loaded, process it with jscanify
    newImg.onload = function () {
      const scanner = new jscanify();
      const resultCanvas = scanner.extractPaper(newImg, 386, 500);

      // Display the scanned document
      const resultImage = new Image();
      resultImage.src = resultCanvas.toDataURL();

      // You can use resultImage to display the scanned document
      // For example, append it to a container
      document.getElementById('scannedDocument').appendChild(resultImage);
    };
    });




  };


console.log(Imagevalue,"Imagevalue")
  return (
    <>
      {/* <div className="scanner-container">
        <div>
          {!loadedOpenCV && (
            <div>
              <h2>Loading OpenCV...</h2>
            </div>
          )}
          {images.map((image, index) => (
            <img
              key={index}
              className={
                selectedImage && selectedImage.src === image.src
                  ? "selected"
                  : ""
              }
              src={image.src}
              onClick={() => setSelectedImage(image)}
            />
          ))}
        </div>
        <div ref={containerRef} id="result-container"></div>
        <img src={Imagevalue} alt="Extracted Paper" />

      </div> */}
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={640}
        height={480}
      />
      <button onClick={capturePhoto}>Capture Photo</button>
      <div id="scannedDocument"></div>
    </>
  );
}
