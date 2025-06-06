import React, { useState, useRef, useEffect } from "react";

/**
 * PUBLIC_INTERFACE
 * KaraokeVibe - Playback Component with Mock Audio Controls and Voice Filter Indication
 * Allows users to play/pause a mock recording, shows selected voice filter,
 * and provides a button to continue to Save & Share. No real audio processing is performed.
 *
 * This version fakes audio playback with a progress bar, a simulated audio element,
 * shows which filter is selected, allows Play/Pause, and disables Save during playback.
 * For accessibility, filter and playback status are clearly indicated.
 */
import { useNavigate } from "react-router-dom";

// Demo mock audio file - in a real app, recording would be provided.
// Placeholder public domain audio.
const DEMO_AUDIO_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

// Demo filter options, matching VoiceFilters.js.
const FILTERS = [
  { label: "Echo", value: "echo" },
  { label: "Auto-Tune", value: "autotune" },
  { label: "Robot", value: "robot" },
];
// Default settings, would normally come from context/persisted state.
// Here, 'echo' and 13s as in the rest of the demo.
const DEFAULT_FILTER = "echo";
const DEFAULT_RECORDING_LENGTH = 13; // seconds

function Playback() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playhead, setPlayhead] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState(DEFAULT_FILTER);

  const intervalRef = useRef(null);

  // Simulate playback timer (mocks real audio, as no actual recording).
  // When play starts, increment timer until max duration.
  useEffect(() => {
    if (isPlaying) {
      // If playhead is already at end, rewind and play from start.
      if (playhead >= DEFAULT_RECORDING_LENGTH) {
        setPlayhead(0);
      }
      intervalRef.current = setInterval(() => {
        setPlayhead((prev) => {
          if (prev + 1 >= DEFAULT_RECORDING_LENGTH) {
            clearInterval(intervalRef.current);
            setIsPlaying(false);
            return DEFAULT_RECORDING_LENGTH;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    // Cleanup on unmount.
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line
  }, [isPlaying]);

  // When playhead reaches the end, auto-stop playback.
  useEffect(() => {
    if (playhead >= DEFAULT_RECORDING_LENGTH && isPlaying) {
      setIsPlaying(false);
      clearInterval(intervalRef.current);
    }
  }, [playhead, isPlaying]);

  // If the filter was supposed to be selectable here, we'd need to get it from state or props.
  // For demo, we use echo/default. Show the label clearly.
  const currentFilterLabel =
    FILTERS.find((f) => f.value === selectedFilter)?.label || "None";

  // Manual position adjustment (seeking)
  function handleSeek(e) {
    setPlayhead(Number(e.target.value));
  }

  // Toggle play/pause
  function handlePlayPause() {
    // If at end, restart playback from the beginning
    if (!isPlaying && playhead >= DEFAULT_RECORDING_LENGTH) {
      setPlayhead(0);
    }
    setIsPlaying((prev) => !prev);
  }

  // Format seconds as MM:SS
  function formatTime(secs) {
    const mm = String(Math.floor(secs / 60)).padStart(2, "0");
    const ss = String(secs % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  }

  return (
    <div className="hero">
      <div className="subtitle">Playback</div>
      <h1 className="title">Playback Performance</h1>
      <div className="description" style={{ marginBottom: 12 }}>
        Listen to your mock recording with your selected voice filter applied!
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
        }}
      >
        {/* Voice filter indication */}
        <div
          style={{
            fontSize: "1.07em",
            color: "var(--primary)",
            letterSpacing: "0.03em",
            marginBottom: 4,
          }}
          aria-live="polite"
        >
          <b>Selected Filter:</b>{" "}
          <span
            style={{
              color: "var(--accent)",
              fontWeight: 700,
              marginLeft: 4,
            }}
          >
            {currentFilterLabel}
          </span>
        </div>
        {/* Simulated audio bar and playback controls */}
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
                : "none",
            }}
            onClick={handlePlayPause}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
          {/* Progress Bar */}
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
              accentColor: "var(--accent)",
            }}
            aria-label="Playback position"
          />
          <span
            style={{
              fontSize: "1.01em",
              color: "var(--text-secondary)",
              width: 56,
              textAlign: "center",
            }}
          >
            {formatTime(playhead)} / {formatTime(DEFAULT_RECORDING_LENGTH)}
          </span>
        </div>
        <div
          style={{
            fontSize: "0.96em",
            color: "var(--text-secondary)",
            opacity: 0.72,
          }}
        >
          (This is a mock. Actual audio & filter preview will play here!)
        </div>
      </div>
      <div>
        <button
          className="btn"
          style={{
            background: "var(--primary)",
            color: "var(--secondary)",
            fontWeight: 600,
          }}
          onClick={() => navigate("/save")}
          disabled={isPlaying}
        >
          Save &amp; Share
        </button>
      </div>
      <div
        style={{
          marginTop: 12,
          fontSize: "0.95em",
          color: "var(--text-secondary)",
        }}
      >
        {isPlaying
          ? `Playing (with filter: ${currentFilterLabel})`
          : ""}
      </div>
      {/* Visually hidden audio element for mock demo feel */}
      <audio
        style={{ display: "none" }}
        src={DEMO_AUDIO_URL}
        controls={false}
      />
    </div>
  );
}

export default Playback;
