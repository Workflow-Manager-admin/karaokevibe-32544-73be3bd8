import React, { useState } from "react";

// PUBLIC_INTERFACE
/**
 * KaraokeVibe - VoiceFilters Component with Selectable Filters UI
 * Shows mock voice filter buttons. Selected filter is tracked in state, with clear visual distinction.
 * No audio or backend logic is implemented at this stage.
 */
import { useNavigate } from "react-router-dom";

const FILTERS = [
  { label: "Echo", value: "echo" },
  { label: "Auto-Tune", value: "autotune" },
  { label: "Robot", value: "robot" },
];

function VoiceFilters() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("echo"); // "echo" is default

  return (
    <div className="hero">
      <div className="subtitle">Voice Filters</div>
      <h1 className="title">Apply Fun Filters</h1>
      <div className="description">
        Select a filter below. Your choice will be applied to your voice during playback!
      </div>
      <div style={{ margin: "2rem 0", display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={
              selected === f.value
                ? "btn btn-large"
                : "btn"
            }
            style={
              selected === f.value
                ? {
                    background: "var(--accent)",
                    color: "var(--secondary)",
                    border: "2px solid var(--primary)",
                    fontWeight: 700,
                    boxShadow: "0 4px 18px rgba(255,215,0,0.13)",
                    transition: "background 0.22s"
                  }
                : {}
            }
            type="button"
            onClick={() => setSelected(f.value)}
            aria-pressed={selected === f.value}
          >
            {f.label}
            {selected === f.value && (
              <span style={{ marginLeft: 10, fontSize: "1.1em" }} aria-label="selected">
                ✓
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="description" style={{ margin: "10px 0", fontSize: "1.07em", color: "var(--primary)" }}>
        Selected filter: <b>{FILTERS.find(f => f.value === selected)?.label}</b>
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
