import React from "react";

// PUBLIC_INTERFACE
/**
 * KaraokeVibe - SaveShare Stub Component
 * Displays a placeholder UI for the Save & Share feature.
 */
function SaveShare() {
  return (
    <div className="hero">
      <div className="subtitle">Save & Share</div>
      <h1 className="title">Save and Share Performance</h1>
      <div className="description">
        This is a placeholder for Save & Share. Download and share your best karaoke moments!
      </div>
      <div style={{ margin: "2rem 0", display: "flex", gap: 16, justifyContent: "center" }}>
        <button className="btn" disabled>Save (Coming soon)</button>
        <button className="btn" disabled>Share (Coming soon)</button>
      </div>
    </div>
  );
}

export default SaveShare;
