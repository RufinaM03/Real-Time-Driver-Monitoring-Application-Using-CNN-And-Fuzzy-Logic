import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const BASE_URL = process.env.REACT_APP_API_BASE;

const DrowsinessMonitor = () => {
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [monitoring, setMonitoring] = useState(false);
  const [resultText, setResultText] = useState("Waiting...");
  const [graphData, setGraphData] = useState([]);
  const cycleCount = useRef(0);

  useEffect(() => {
    if (monitoring && !recording) {
      startRecording();
    }
  }, [monitoring]);

  const startRecording = async () => {
    try {
      const stream = webcamRef.current?.stream;

      if (!stream) {
        console.error("Webcam stream not ready");
        setMonitoring(false);
        return;
      }

      setRecording(true);
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm",
      });

      mediaRecorderRef.current = mediaRecorder;
      const chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });
        sendToBackend(blob);
      };

      mediaRecorder.start();

      window.nextCycleTimeout = setTimeout(() => {
        if (
          mediaRecorderRef.current &&
          mediaRecorderRef.current.state !== "inactive"
        ) {
          mediaRecorderRef.current.stop();
          setRecording(false);
        }
      }, 4000);
    } catch (err) {
      console.error("Recording failed:", err);
      setRecording(false);
      setMonitoring(false);
    }
  };

  const sendToBackend = async (blob) => {
    const formData = new FormData();
    formData.append("video", blob, "webcam.webm");

    try {
      const res = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      const predVal = parseFloat(result.pred);
      const label = result.result.toLowerCase();

      setResultText(label.replace("_", " "));

      cycleCount.current += 1;
      const color =
        label === "drowsy" ? "red" : label === "focused" ? "green" : "gold";

      setGraphData((prev) => [
        ...prev,
        { time: cycleCount.current, pred: predVal, stroke: color },
      ]);

      if (label === "drowsy") {
        const beep = new Audio(process.env.PUBLIC_URL + "/alert-beep.wav");
        beep.play();
        setTimeout(() => {
          beep.pause();
          beep.currentTime = 0;
        }, 2000);
      }

      if (monitoring) {
        setTimeout(() => {
          startRecording();
        }, 1000);
      }
    } catch (error) {
      console.error("Upload or prediction failed:", error);
      setResultText("Error occurred");
    }
  };

  useEffect(() => {
    fetch(`${BASE_URL}/upload`)
      .then((res) => res.text())
      .then((data) => console.log("Backend status:", data))
      .catch((err) => console.error("Backend not reachable:", err));
  }, []);

  return (
    <div className="p-4 text-center">
      <Webcam
        audio={false}
        ref={webcamRef}
        className="rounded-lg shadow-md mx-auto"
        videoConstraints={{ width: 640, height: 480 }}
        onUserMedia={() => console.log("Webcam started")}
      />

      <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={() => setMonitoring(true)}
          disabled={monitoring}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Start Monitoring
        </button>

        <button
          onClick={() => {
            setMonitoring(false);
            setRecording(false);
            if (
              mediaRecorderRef.current &&
              mediaRecorderRef.current.state !== "inactive"
            ) {
              mediaRecorderRef.current.stop();
            }
            clearTimeout(window.nextCycleTimeout);
          }}
          disabled={!monitoring}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Stop Monitoring
        </button>
      </div>

      <div className="mt-4 text-lg font-semibold">
        Current Status: <span className="capitalize">{resultText}</span>
      </div>

      <div className="mt-6 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              label={{
                value: "Cycle",
                position: "insideBottomRight",
                offset: -5,
              }}
            />
            <YAxis
              domain={[0, 0.4]}
              label={{
                value: "Prediction",
                angle: -90,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="pred"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 2 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DrowsinessMonitor;
