import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 * KaraokeVibe - Playback Component
 * Plays audio of a mock recording, shows active filter, play/pause controls,
 * and a visual indicator of the selected filter during playback.
 * No real audio processing happens in this MVP.
 */

// Demo mock audio file.
const DEMO_AUDIO_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

// Demo filter options (in real app, these may come from global or session state).
const FILTERS = [
  { label: "Echo", value: "echo" },
  { label: "Auto-Tune", value: "autotune" },
  { label: "Robot", value: "robot" },
];
const DEFAULT_FILTER = "echo"; // For demo; would be user-choice.

function Playback() {
  const navigate = useNavigate();

  // Demo: active filter remembered here (replace with state sharable between pages for real).
  const [selectedFilter] = useState(DEFAULT_FILTER);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioDuration, setAudioDuration] = useState(0);
  const [playhead, setPlayhead] = useState(0);

  const audioRef = useRef(null);

  // Sync playhead with <audio> tag's current time and manage audio events.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    function updatePlayhead() {
      setPlayhead(audio.currentTime);
    }
    function setDuration() {
      setAudioDuration(audio.duration || 13); // fallback to previous demo duration
    }
    function handleEnded() {
      setIsPlaying(false);
      setPlayhead(audio.duration || 0);
    }

    audio.addEventListener("timeupdate", updatePlayhead);
    audio.addEventListener("loadedmetadata", setDuration);
    audio.addEventListener("ended", handleEnded);

    // Fallback for older browsers
    setAudioDuration(audio.duration || 13);

    return () => {
      audio.removeEventListener("timeupdate", updatePlayhead);
      audio.removeEventListener("loadedmetadata", setDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Play/pause controls for audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      // If at end, restart playback
      if (audio.currentTime >= (audio.duration || 0)) {
        audio.currentTime = 0;
        setPlayhead(0);
      }
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Seek bar handler
  function handleSeek(e) {
    const val = Number(e.target.value);
    setPlayhead(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  }

  // Play/Pause toggle
  function handlePlayPause() {
    const audio = audioRef.current;
    // If playback has finished, restart from beginning
    if (!isPlaying && audio && audio.currentTime >= (audio.duration || 0)) {
      audio.currentTime = 0;
      setPlayhead(0);
    }
    setIsPlaying((prev) => !prev);
  }

  // Utility: format seconds to MM:SS
  function formatTime(secs) {
    if (isNaN(secs) || secs == null) return "00:00";
    const mm = String(Math.floor(secs / 60)).padStart(2, "0");
    const ss = String(Math.floor(secs % 60)).padStart(2, "0");
    return `${mm}:${ss}`;
  }

  // Current filter label (visual only)
  const currentFilterLabel =
    FILTERS.find((f) => f.value === selectedFilter)?.label || "None";

  return (
    <div className="hero">
      <div className="subtitle">Playback</div>
      <h1 className="title">Playback Performance</h1>
      <div className="description" style={{ marginBottom: 12 }}>
        Listen to your recording with your chosen voice filter!
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
        {/* Show current filter visually */}
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
            aria-label={`Current filter: ${currentFilterLabel}`}
          >
            {currentFilterLabel}
          </span>
        </div>
        {/* Audio controls */}
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
          <input
            type="range"
            min={0}
            max={audioDuration}
            step={0.1}
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
            {formatTime(playhead)} / {formatTime(audioDuration)}
          </span>
        </div>
        <div
          style={{
            fontSize: "0.96em",
            color: "var(--text-secondary)",
            opacity: 0.72,
          }}
        >
          (Voice filter appearance is for demo only. No live audio FX applied.)
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
        aria-live="polite"
      >
        {isPlaying
          ? `Playing (with filter: ${currentFilterLabel})`
          : ""}
      </div>
      {/* Audio playback element, visually hidden; controlled only via UI */}
      <audio
        ref={audioRef}
        src={DEMO_AUDIO_URL}
        style={{ display: "none" }}
        preload="auto"
      />
    </div>
  );
}

export default Playback;
