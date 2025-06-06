import React from "react";

// PUBLIC_INTERFACE
/**
 * KaraokeVibe - SingMode Stub Component
 * Displays a placeholder UI for the Sing Mode feature.
 * Shows songId from URL. Demo "Start Recording" button leads to Recording.
 */
import { useParams, useNavigate } from "react-router-dom";

function SingMode() {
  const { songId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="hero">
      <div className="subtitle">Sing Mode</div>
      <h1 className="title">Sing-Along Mode</h1>
      <div className="description" style={{ marginBottom: 14 }}>
        This is a placeholder for the Sing Mode interface. Synced lyrics and instrumental playback will be here.
      </div>
      <div style={{ color: "var(--text-secondary)", marginBottom: 24, fontSize: "1.05em" }}>
        Song selected: <b>{"#" + songId}</b> (demo stub)
      </div>
      <div style={{ margin: "2rem 0" }}>
        <button
          className="btn btn-large"
          onClick={() => navigate("/record")}
        >
          Start Recording
        </button>
      </div>
    </div>
  );
}

export default SingMode;
