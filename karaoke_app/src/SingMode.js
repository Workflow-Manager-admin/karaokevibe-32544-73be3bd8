import React from "react";

// PUBLIC_INTERFACE
/**
 * KaraokeVibe - SingMode Stub Component
 * Displays a placeholder UI for the Sing Mode feature.
 */
function SingMode() {
  return (
    <div className="hero">
      <div className="subtitle">Sing Mode</div>
      <h1 className="title">Sing-Along Mode</h1>
      <div className="description">
        This is a placeholder for the Sing Mode interface. Synced lyrics and instrumental playback will be here.
      </div>
      <div style={{ margin: "2rem 0" }}>
        <button className="btn btn-large" disabled>Start Singing (Coming soon)</button>
      </div>
    </div>
  );
}

export default SingMode;
