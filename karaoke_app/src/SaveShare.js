import React, { useState } from "react";
// PUBLIC_INTERFACE
/**
 * KaraokeVibe - SaveShare Component with Download Button for Recorded Audio
 * Implements a "Save" button, and provides a download button for generated audio file (if available).
 * Also includes the "Start Over" button to return to Song List for demo flow.
 */
import { useNavigate } from "react-router-dom";

/**
 * Attempt to read the user's audio recording from state or fallback to sessionStorage.
 * Ideally, in a production app, we would use React Context or a global store.
 * For this MVP, check window.sessionStorage if needed.
 */
function getRecordingURL() {
  // Try grabbing from sessionStorage for MVP stateless flow
  // (In a real app, would be React Context or global state!)
  if (window && window.sessionStorage) {
    try {
      const url = window.sessionStorage.getItem("recordingURL");
      if (url && typeof url === "string" && url.startsWith("blob:")) return url;
    } catch (e) {} // ignore
  }
  return null;
}

function SaveShare() {
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);

  // You would pull this from global/app state or context.
  // For this MVP, simply try to fetch it at render time (might not work if page is hard-refreshed).
  // In a real flow: pass down via props/context or global state.
  const [audioURL] = useState(() => getRecordingURL());

  // PUBLIC_INTERFACE
  function handleSaveClick() {
    // Simulate synchronous mock save; could replace with async in the future
    setIsSaved(true);
    // Optionally, could show temporary ("Saved!") and then hide again after X seconds
    // (MVP: persistent on click until reload)
  }

  // PUBLIC_INTERFACE
  // Trigger download of the audio recording
  function handleDownload() {
    if (!audioURL) return;
    // Suggest a filename to the user
    const fileName = "karaoke-performance.webm";
    const link = document.createElement("a");
    link.href = audioURL;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          : "Download and share your best karaoke moments! Use the button below if your recording is available."
        }
      </div>
      {/* Download Button Section */}
      <div style={{ margin: "1.25rem 0 2rem 0", display: "flex", gap: 18, flexDirection: "column", alignItems: "center" }}>
        <button
          className="btn"
          onClick={handleDownload}
          style={{
            background: audioURL ? "var(--primary)" : "#222",
            color: audioURL ? "#191414" : "#aaa",
            fontWeight: 700,
            opacity: audioURL ? 1 : 0.55,
            cursor: audioURL ? "pointer" : "not-allowed",
            minWidth: 160,
            marginBottom: 6
          }}
          disabled={!audioURL}
          aria-disabled={!audioURL}
        >
          {audioURL ? "Download Recording" : "No Recording To Download"}
        </button>
        {/* Optionally, a warning if missing */}
        {!audioURL && (
          <div style={{ color: "#FF6A77", fontWeight: 600, fontSize: "1.04em" }}>
            No recording found to download. Please record your performance first!
          </div>
        )}
      </div>
      {/* Save and Share Buttons */}
      <div style={{ margin: "1rem 0 0 0", display: "flex", gap: 16, justifyContent: "center" }}>
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
