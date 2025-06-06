import React from "react";

// PUBLIC_INTERFACE
/**
 * KaraokeVibe - Recording Stub Component
 * Displays a placeholder UI for the Recording feature.
 * Includes "Apply Voice Filters" button to proceed demo flow.
 */
import { useNavigate } from "react-router-dom";

function Recording() {
  const navigate = useNavigate();

  return (
    <div className="hero">
      <div className="subtitle">Recording</div>
      <h1 className="title">Record Your Performance</h1>
      <div className="description">
        This is a placeholder for the Recording interface. Recording controls and indicators will appear here.
      </div>
      <div style={{ margin: "2rem 0" }}>
        <button className="btn btn-large" disabled>
          Start Recording (Coming soon)
        </button>
      </div>
      <div style={{ marginBottom: 32 }}>
        <button
          className="btn"
          style={{ background: "var(--primary)", color: "var(--secondary)" }}
          onClick={() => navigate("/filters")}
        >
          Apply Voice Filters
        </button>
      </div>
    </div>
  );
}

export default Recording;
