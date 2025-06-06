import React, { useState, useRef } from "react";

/**
 * PUBLIC_INTERFACE
 * KaraokeVibe - Playback Component with Mock Audio Controls and Voice Filter Indication
 * Allows users to play/pause a mock recording, shows selected voice filter,
 * and provides a button to continue to Save & Share. No real audio processing is performed.
 */
import { useNavigate } from "react-router-dom";

// These should match the options in VoiceFilters.js for plausible demo state.
const FILTERS = [
  { label: "Echo", value: "echo" },
  { label: "Auto-Tune", value: "autotune" },
  { label: "Robot", value: "robot" },
];

// For demo: default to 'echo', in real app this would be persisted via context/state.
const DEFAULT_FILTER = "echo";
const DEFAULT_RECORDING_LENGTH = 13; // seconds, arbitrary demo length

function Playback() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playhead, setPlayhead] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState(DEFAULT_FILTER);

  const intervalRef = useRef(null);

  // Start or stop mock playback (progress bar and timer) – mock only!
  function handlePlayPause() {
    if (isPlaying) {
      clearInterval(intervalRef.current);
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      intervalRef.current = setInterval(() => {
        setPlayhead(prev =>
          prev + 1 >= DEFAULT_RECORDING_LENGTH ? DEFAULT_RECORDING_LENGTH : prev + 1
        );
      }, 1000);
    }
  }

  // When playback completes, auto-stop
  React.useEffect(() => {
    if (playhead >= DEFAULT_RECORDING_LENGTH && isPlaying) {
      setIsPlaying(false);
      clearInterval(intervalRef.current);
    }
  }, [playhead, isPlaying]);

  // Reset playhead on unmount or pause
  React.useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  function handleSeek(e) {
    const value = Number(e.target.value);
    setPlayhead(value);
  }

  // Format seconds as MM:SS
  function formatTime(secs) {
    const mm = String(Math.floor(secs / 60)).padStart(2, "0");
    const ss = String(secs % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  }

  // For demo: display label for filter
  const currentFilterLabel =
    FILTERS.find(f => f.value === selectedFilter)?.label || "None";

  return (
    <div className="hero">
      <div className="subtitle">Playback</div>
      <h1 className="title">Playback Performance</h1>
      <div className="description" style={{ marginBottom: 12 }}>
        Listen to your (mock) recording with your selected voice filter applied!
      </div>
      <div
        style={{
          margin: "1.8rem 0 1rem 0",
          maxWidth: 400,
          width: "100%",
          padding: "1.2rem 1rem",
          background: "rgba(0,0,0,0.10)",
          borderRadius: 14,
          boxShadow: "0 2.5px 9px rgba(25,25,25,0.10)",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 18
        }}
      >
        {/* Filter display */}
        <div style={{ fontSize: "1.07em", color: "var(--primary)", letterSpacing: "0.03em" }}>
          <b>Selected Filter:</b>{" "}
          <span style={{
            color: "var(--accent)", fontWeight: 700, marginLeft: 4
          }}>
            {currentFilterLabel}
          </span>
        </div>

        {/* Mock audio controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            className="btn btn-large"
            aria-label={isPlaying ? "Pause playback" : "Play recording"}
            style={{
              background: isPlaying ? "var(--accent)" : "var(--primary)",
              color: isPlaying ? "var(--secondary)" : "#191414",
              fontWeight: 700,
              minWidth: 70,
              boxShadow: isPlaying
                ? "0 4px 18px rgba(255,215,0,0.14)"
                : "none"
            }}
            onClick={handlePlayPause}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          {/* Progress bar */}
          <input
            type="range"
            min={0}
            max={DEFAULT_RECORDING_LENGTH}
            value={playhead}
            onChange={handleSeek}
            disabled={!isPlaying}
            style={{
              width: 120,
              cursor: isPlaying ? "pointer" : "not-allowed",
              accentColor: "var(--accent)"
            }}
            aria-label="Playback position"
          />
          <span style={{
            fontSize: "1.01em", color: "var(--text-secondary)", width: 56, textAlign: "center"
          }}>
            {formatTime(playhead)} / {formatTime(DEFAULT_RECORDING_LENGTH)}
          </span>
        </div>
        <div style={{ fontSize: "0.96em", color: "var(--text-secondary)", opacity: 0.72 }}>
          (This is a demo. Actual audio will play here in a future update!)
        </div>
      </div>
      <div>
        <button
          className="btn"
          style={{ background: "var(--primary)", color: "var(--secondary)" }}
          onClick={() => navigate("/save")}
          disabled={isPlaying}
        >
          Save &amp; Share
        </button>
      </div>
      <div style={{ marginTop: 12, fontSize: "0.95em", color: "var(--text-secondary)" }}>
        {isPlaying ? "Playing with filter: " + currentFilterLabel : ""}
      </div>
    </div>
  );
}

export default Playback;
