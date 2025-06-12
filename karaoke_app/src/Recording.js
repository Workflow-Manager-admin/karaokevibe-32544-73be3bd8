import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// PUBLIC_INTERFACE
/**
 * KaraokeVibe - Recording Component using MediaRecorder for Real Microphone Audio
 * - Requests mic permission
 * - Allows start/stop of audio recording
 * - Records as audio/webm, saves blob URL in state
 * - Provides error/status handling, playback preview, discard
 * - Allows downstream navigation for filter/playback, disables controls as needed
 */
function Recording() {
  const navigate = useNavigate();

  // --- Recording state ---
  const [isRecording, setIsRecording] = useState(false);
  const [permissionError, setPermissionError] = useState("");
  const [audioURL, setAudioURL] = useState(null); // stores blob:url
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [elapsed, setElapsed] = useState(0); // in seconds

  const audioRef = useRef(null); // For playback preview
  const chunksRef = useRef([]); // For raw audio chunks
  const timerRef = useRef(null); // Interval for elapsed timer
  const streamRef = useRef(null); // For clean up

  // --- Timer effect (for recording elapsed seconds) ---
  useEffect(() => {
    if (isRecording) {
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    } else {
      clearInterval(timerRef.current);
      setElapsed(0);
    }
    return () => clearInterval(timerRef.current);
  }, [isRecording]);

  // --- Blob cleanup effect on unmount ---
  useEffect(() => {
    return () => {
      if (audioURL) URL.revokeObjectURL(audioURL);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [audioURL]);

  // --- PUBLIC_INTERFACE: Start Recording with MediaRecorder ---
  async function startRecording() {
    setPermissionError("");
    setAudioURL(null);
    setIsPreviewing(false);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setPermissionError("Your browser does not support microphone access.");
        return;
      }
      // Request mic permissions
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      if (typeof window.MediaRecorder === "undefined") {
        setPermissionError("Your browser does not support MediaRecorder audio recording.");
        return;
      }

      // Setup MediaRecorder
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        // Prepare blob for audio/webm (universal browser support)
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(audioBlob);
        setAudioURL(url);

        // Cleanup stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
          streamRef.current = null;
        }
        setMediaRecorder(null);
      };

      recorder.onerror = (e) => {
        setPermissionError("Recording error: " + (e && e.error && e.error.message ? e.error.message : "Unknown error."));
        setIsRecording(false);
        if (mediaRecorder && mediaRecorder.state === "recording") {
          mediaRecorder.stop();
        }
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
      setElapsed(0);
    } catch (err) {
      setPermissionError(
        err && err.name === "NotAllowedError"
          ? "Microphone access was denied. Please allow access to record your voice."
          : "Could not start recording: " + (err.message || "Unknown error")
      );
      setIsRecording(false);
      setMediaRecorder(null);
    }
  }

  // --- PUBLIC_INTERFACE: Stop Recording ---
  function stopRecording() {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
    }
    setIsRecording(false);
  }

  // --- PUBLIC_INTERFACE: Playback Controls (Preview) ---
  function handlePreview() {
    setIsPreviewing(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  }
  function handleAudioEnded() {
    setIsPreviewing(false);
  }

  // --- Format seconds as MM:SS ---
  function formatTime(seconds) {
    const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
    const ss = String(seconds % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  }

  return (
    <div className="hero">
      <div className="subtitle">Recording</div>
      <h1 className="title">Record Your Performance</h1>
      {/* Error/Status Display */}
      <div className="description" style={{ minHeight: 40 }}>
        {permissionError ? (
          <span style={{ color: "#FF6A77", fontWeight: 600 }}>{permissionError}</span>
        ) : isRecording ? (
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
                animation: "blinker 1s step-start infinite",
              }}
            />
            <b>Recording... {formatTime(elapsed)}</b>
          </span>
        ) : audioURL ? (
          <span style={{ color: "var(--primary)", fontWeight: 600 }}>
            Recording complete! You can preview below.
          </span>
        ) : (
          "Press 'Start Recording' when you're ready, and sing your heart out!"
        )}
      </div>
      {/* Main recording controls */}
      <div style={{ margin: "2rem 0" }}>
        {!isRecording ? (
          <button
            className="btn btn-large"
            style={!audioURL ? {} : { background: "#191414", color: "#FFD700", border: "2px solid var(--primary)" }}
            onClick={startRecording}
            aria-pressed={false}
            disabled={isRecording}
          >
            Start Recording
          </button>
        ) : (
          <button
            className="btn btn-large"
            style={{ background: "#191414", color: "#FFD700", border: "2px solid red" }}
            onClick={stopRecording}
            aria-pressed={true}
          >
            Stop Recording
          </button>
        )}
      </div>
      {/* Audio Preview Section */}
      {audioURL && (
        <div
          style={{
            margin: "1.5rem 0 2rem 0",
            padding: "1rem 1rem",
            background: "rgba(0,0,0,0.13)",
            borderRadius: "11px",
            boxShadow: "0 3px 13px rgba(25,25,25,0.12)",
            maxWidth: 340,
            width: "100%",
          }}
        >
          <div
            style={{
              color: "var(--primary)",
              fontWeight: 700,
              fontSize: "1.08em",
              marginBottom: 7,
            }}
          >
            <span role="img" aria-label="microphone">
              🎧
            </span>{" "}
            Preview Recording
          </div>
          <audio
            ref={audioRef}
            src={audioURL}
            controls
            style={{ width: "100%", outline: "none" }}
            onPlay={() => setIsPreviewing(true)}
            onPause={() => setIsPreviewing(false)}
            onEnded={handleAudioEnded}
            aria-label="Recording preview"
          />
          <div style={{ marginTop: 10, textAlign: "center" }}>
            <button
              className="btn"
              style={{
                background: isPreviewing ? "var(--accent)" : "var(--primary)",
                color: isPreviewing ? "var(--secondary)" : "#191414",
                fontWeight: 700,
                minWidth: 96,
                letterSpacing: "0.02em",
                marginRight: 8,
              }}
              disabled={isPreviewing}
              onClick={handlePreview}
              aria-label="Play preview"
            >
              {isPreviewing ? "Playing..." : "Play Preview"}
            </button>
            <button
              className="btn"
              style={{
                background: "#333",
                color: "#FFD700",
                fontWeight: 600,
                minWidth: 80,
                marginLeft: 2,
                border: "1.2px solid var(--primary)",
                opacity: isPreviewing ? 0.74 : 1,
                cursor: isPreviewing ? "not-allowed" : "pointer",
              }}
              disabled={isPreviewing}
              onClick={() => {
                setAudioURL(null);
                setIsPreviewing(false);
              }}
              aria-label="Discard recording"
            >
              Discard
            </button>
          </div>
        </div>
      )}
      {/* Next: Voice Filters */}
      <div style={{ marginBottom: 30 }}>
        <button
          className="btn"
          style={{ background: "var(--primary)", color: "var(--secondary)" }}
          onClick={() => navigate("/filters")}
          disabled={isRecording || !!permissionError || !audioURL}
        >
          Apply Voice Filters
        </button>
      </div>
      {/* Blinker keyframes for recording indicator */}
      <style>
        {`@keyframes blinker { 50% { opacity: 0.18; } }`}
      </style>
    </div>
  );
}

export default Recording;
