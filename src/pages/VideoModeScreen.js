import React, { useRef, useState, useEffect } from 'react';
import Webcam from "react-webcam";
import Header from '../components/Header';
import './video.css'; // Import CSS file for styling

function VideoModeScreen() {
    const webcamRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const [recordedChunks, setRecordedChunks] = useState([]);
    const [recordedVideoUrl, setRecordedVideoUrl] = useState(null);
    const [isRecording, setIsRecording] = useState(false);


    useEffect(() => {
        if (recordedChunks.length > 0 && !isRecording) {
            const recordedBlob = new Blob(recordedChunks, { type: 'video/webm' });
            console.log(recordedBlob, "RECORDED BLOB")
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
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.style = 'display: none';
            a.href = recordedVideoUrl;
            a.download = 'recorded_video.webm';
            a.click();
            window.URL.revokeObjectURL(recordedVideoUrl);
        }
    };


    const retake = () => {

        setRecordedChunks([])
        setRecordedVideoUrl(null)
        setIsRecording(false)

    }


    const uploadBlob = () => {

        const recordedBlob = new Blob(recordedChunks, { type: 'video/webm' });
        console.log(recordedBlob, "Upload BLOB")


    }
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user", // or "environment" for the rear camera
    };

    return (
        <>
            <Header />
            {!recordedVideoUrl &&
                <div className="webcam-container" style={{ backgroundColor: "#000000" }}>
                    <Webcam
                        ref={webcamRef}
                        className='Webcam-view'
                        videoConstraints={videoConstraints}

                    />
                    {isRecording ? (
                        <button onClick={handleStopRecording} className="record-button" id="recordButton">Stop Recording</button>
                    ) : (
                        <button onClick={handleStartRecording} className="record-button" id="recordButton">Start Recording</button>
                    )}
                </div>
            }
            {recordedVideoUrl && (
                <div className="webcam-container" style={{ backgroundColor: "#000000" }}>
                    <video
                        controls
                        style={{ width: '50%', height: 'auto' }}
                        src={recordedVideoUrl}

                    />

                    <button onClick={() => retake()} className="record-button" id="recordButton">Retake</button>

                    <button onClick={uploadBlob} className="record-button" id="recordButton">Upload</button>

                </div>
            )}
        </>
    );
}

export default VideoModeScreen;