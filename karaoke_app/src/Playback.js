import React from "react";

// PUBLIC_INTERFACE
/**
 * KaraokeVibe - Playback Stub Component
 * Displays a placeholder UI for the Playback feature.
 * Adds "Save & Share" button to proceed in demo flow.
 */
import { useNavigate } from "react-router-dom";

function Playback() {
  const navigate = useNavigate();

  return (
    <div className="hero">
      <div className="subtitle">Playback</div>
      <h1 className="title">Playback Performance</h1>
      <div className="description">
        This is a placeholder for Playback. Listen to your recording with voice filters applied!
      </div>
      <div style={{ margin: "2rem 0" }}>
        <button className="btn btn-large" disabled>
          Play Recording (Coming soon)
        </button>
      </div>
      <div>
        <button
          className="btn"
          style={{ background: "var(--primary)", color: "var(--secondary)" }}
          onClick={() => navigate("/save")}
        >
          Save &amp; Share
        </button>
      </div>
    </div>
  );
}

export default Playback;
