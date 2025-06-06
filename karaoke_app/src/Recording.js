import React from "react";

// PUBLIC_INTERFACE
/**
 * KaraokeVibe - Recording Stub Component
 * Displays a placeholder UI for the Recording feature.
 */
function Recording() {
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
    </div>
  );
}

export default Recording;
