import React, { useState, useRef, useEffect } from "react";

// PUBLIC_INTERFACE
/**
 * KaraokeVibe - Recording Component with Mock "Start Recording" Feature
 * Adds a real "Start Recording" button with state, visual indicator, and a mock timer.
 * No actual audio recorded; state-driven UI only for demo/MVP.
 */
import { useNavigate } from "react-router-dom";

function Recording() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef(null);

  // Start/stop mock timer on recording state
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    } else {
      clearInterval(timerRef.current);
      setElapsed(0);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  // Format seconds as MM:SS
  function formatTime(seconds) {
    const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
    const ss = String(seconds % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  }

  return (
    <div className="hero">
      <div className="subtitle">Recording</div>
      <h1 className="title">Record Your Performance</h1>
      <div className="description">
        {isRecording
          ? (
              <span style={{ color: "var(--accent)" }}>
                <span
                  style={{
                    display: "inline-block",
                    height: 16,
                    width: 16,
                    borderRadius: "50%",
                    background: "red",
                    marginRight: 8,
                    boxShadow: "0 0 6px 2px rgba(255,0,0,0.5)",
                    verticalAlign: "middle",
                    animation: "blinker 1s step-start infinite"
                  }}
                />
                <b>Recording... {formatTime(elapsed)}</b>
              </span>
            )
          : "Press 'Start Recording' when you're ready, and sing your heart out!"}
      </div>
      <div style={{ margin: "2rem 0" }}>
        <button
          className="btn btn-large"
          style={
            isRecording
              ? { background: "#191414", color: "#FFD700", border: "2px solid red" }
              : {}
          }
          onClick={() => setIsRecording(rec => !rec)}
          aria-pressed={isRecording}
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
      </div>
      <div style={{ marginBottom: 32 }}>
        <button
          className="btn"
          style={{
            background: "var(--primary)",
            color: "var(--secondary)"
          }}
          onClick={() => navigate("/filters")}
          disabled={isRecording}
        >
          Apply Voice Filters
        </button>
      </div>
      {/* Keyframes for blinking red dot, add as inline style tag if not present elsewhere */}
      <style>
        {`@keyframes blinker { 50% { opacity: 0.18; } }`}
      </style>
    </div>
  );
}

export default Recording;
