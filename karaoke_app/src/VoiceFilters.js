import React from "react";

// PUBLIC_INTERFACE
/**
 * KaraokeVibe - VoiceFilters Stub Component
 * Displays a placeholder UI for the Voice Filters feature.
 * Adds a button to continue to Playback for demo.
 */
import { useNavigate } from "react-router-dom";

function VoiceFilters() {
  const navigate = useNavigate();

  return (
    <div className="hero">
      <div className="subtitle">Voice Filters</div>
      <h1 className="title">Apply Fun Filters</h1>
      <div className="description">
        This is a placeholder for Voice Filters. Choose from echo, auto-tune, robot, and more!
      </div>
      <div style={{ margin: "2rem 0", display: "flex", gap: 16, justifyContent: "center" }}>
        <button className="btn" disabled>Echo</button>
        <button className="btn" disabled>Auto-Tune</button>
        <button className="btn" disabled>Robot</button>
      </div>
      <div style={{ margin: "2rem 0" }}>
        <button
          className="btn btn-large"
          onClick={() => navigate("/playback")}
        >
          Continue to Playback
        </button>
      </div>
    </div>
  );
}

export default VoiceFilters;
