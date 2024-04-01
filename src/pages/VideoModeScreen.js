import React, { useRef, useState } from 'react'
import Webcam from "react-webcam";
import Header from '../components/Header'
import './video.css'; // Import CSS file for styling

function VideoModeScreen() {
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [recordedVideoUrl, setRecordedVideoUrl] = useState(null);
    const [isRecording, setIsRecording] = useState(false);







    const handleStartRecording = () => {
        console.log("START")

        const stream = webcamRef.current.video.srcObject;
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = handleDataAvailable;
        mediaRecorderRef.current.start();
        setIsRecording(true);
        setRecordedChunks([]);
    };



    const handleStopRecording = () => {

        console.log("STOOOPP")
        mediaRecorderRef.current.stop();
        setIsRecording(false);
    };

    const handleDataAvailable = (event) => {

        if (event.data.size > 0) {
            console.log("INSIEEEEEE")
            setRecordedChunks((prev) => [...prev, event.data]);


            showRecordedVideo();
        }
    };

    const showRecordedVideo = () => {
        console.log("SHOWWWW", recordedChunks)

        if (recordedChunks.length === 0) return;

        const recordedBlob = new Blob(recordedChunks, { type: 'video/webm' });
        const videoUrl = URL.createObjectURL(recordedBlob);
        setRecordedVideoUrl(videoUrl);
    };

    return (
        <>
            <Header />

            {!recordedVideoUrl &&
                <div className="webcam-container" style={{ backgroundColor: "#000000" }}>

                    <Webcam ref={webcamRef}

                        className='Webcam-view'


                    />

                    {isRecording ? (
                        <button onClick={handleStopRecording} class="record-button" id="recordButton">Stop Recording</button>

                    ) : (
                        <button onClick={handleStartRecording} class="record-button" id="recordButton">Start Recording</button>

                    )}
                    {/* {recordedChunks.length > 0 && (
                    <button onClick={showRecordedVideo}>Download</button>
                )} */}

                </div>
            }
            {recordedVideoUrl && (
                <div className="webcam-container" style={{ backgroundColor: "#000000" }}>

                    <video
                        controls
                        style={{ width: '50%', height: 'auto' }}
                        src={recordedVideoUrl}
                    />
                </div>
            )
            }


        </>
    );
};

export default VideoModeScreen;