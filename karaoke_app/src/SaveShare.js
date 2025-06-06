import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * KaraokeVibe - SaveShare Stub Component
 * Implements a "Save" button with working mock logic—when clicked, shows a confirmation message.
 * Also includes the "Start Over" button to return to Song List for demo flow.
 */
import { useNavigate } from "react-router-dom";

function SaveShare() {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  // PUBLIC_INTERFACE
  function handleSaveClick() {
    // Simulate synchronous mock save; could replace with async in the future
    setIsSaved(true);
    // Optionally, could show temporary ("Saved!") and then hide again after X seconds
    // (MVP: persistent on click until reload)
  }

  return (
    <div className="hero">
      <div className="subtitle">Save & Share</div>
      <h1 className="title">Save and Share Performance</h1>
      <div className="description" style={{ marginBottom: 16 }}>
        {isSaved
          ? (
            <span style={{ color: "var(--primary)", fontWeight: 600 }}>
              🎉 Your performance has been saved!
            </span>
          )
          : "This is a placeholder for Save & Share. Download and share your best karaoke moments!"
        }
      </div>
      <div style={{ margin: "2rem 0", display: "flex", gap: 16, justifyContent: "center" }}>
        <button
          className="btn"
          style={{
            background: isSaved ? "var(--accent)" : "var(--primary)",
            color: isSaved ? "var(--secondary)" : "#191414",
            fontWeight: 700,
            cursor: isSaved ? "not-allowed" : "pointer",
            transition: "background 0.15s"
          }}
          onClick={handleSaveClick}
          disabled={isSaved}
          aria-disabled={isSaved}
        >
          {isSaved ? "Saved!" : "Save"}
        </button>
        <button className="btn" disabled>Share (Coming soon)</button>
      </div>
      <div style={{ marginTop: 32 }}>
        <button
          className="btn"
          style={{ background: "var(--accent)", color: "var(--secondary)", fontWeight: 700 }}
          onClick={() => navigate("/songs")}
        >
          Start Over (Song List)
        </button>
      </div>
    </div>
  );
}

export default SaveShare;
