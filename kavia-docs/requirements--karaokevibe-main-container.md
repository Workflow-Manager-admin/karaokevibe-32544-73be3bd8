# KaraokeVibe Main Container Requirements

## Overview

KaraokeVibe (SingAlong) is a web-based karaoke application designed for enjoyable and seamless user experiences. The application allows users to browse a curated list of songs, engage in interactive sing-along sessions with real-time lyrics synchronization, record their performances with creative filters, and easily save or share the results. The following requirements specification covers the main React container phase, providing functional and non-functional requirements, navigation, page/component structure, theming, and overall behavioral expectations.

---

## 1. Functional Requirements

### 1.1 Song Browsing

- Users must be able to view a scrollable, curated list of karaoke songs.
- Each song entry displays its title and an action button (e.g., "Sing").
- Song data may be hardcoded or demo for the initial implementation (no backend required).

### 1.2 Sing Mode

- When "Sing" is selected, display a dedicated singing interface.
- Lyrics must be displayed in large, readable text and highlighted in sync with the instrumental playback.
- The instrumental audio track plays automatically in this interface.

### 1.3 Recording

- Users may record their vocal performance while the instrumental and synced lyrics are played.
- A clear UI element must indicate recording status (e.g., "Recording..." label or icon).
- Recordings are stored locally within the app session (no external storage or backend required for MVP).

### 1.4 Voice Filters

- Several audio filters (e.g., echo, auto-tune, robot) should be available to apply to user recordings.
- Users can select a filter before or after recording.
- Filtered audio should play back instantly after application.

### 1.5 Playback with Filters

- Users can play back their recorded performance with selected filters applied for review.

### 1.6 Save & Share

- After recording, users can choose to save their performance locally (e.g., as a downloadable audio file).
- Provide a simple share mechanism (such as simulated share or a copyable link), within the constraints of a frontend-only MVP.

### 1.7 Navigation

- At all times, provide a persistent top navigation bar.
- This navbar must contain links to the following pages:
  - Home
  - Song List
  - Contact
- Navigation links should provide clear visual feedback when active or hovered.

---

## 2. Non-Functional Requirements

- **Performance:** The app must load quickly with minimal dependencies; CSS and React only, no heavy UI frameworks.
- **Responsiveness:** The UI should adapt to a variety of screen sizes, from desktop to mobile.
- **Accessibility:** Use semantic HTML and ensure good color contrast for readability.
- **Simplicity:** The codebase and UX should remain easy to understand and extend.

---

## 3. Navigation & Routing Structure

- Navigation is managed via a persistent navbar at the top of the viewport.
- Main application pages:
    - **Home**: Highlights featured songs and descriptive app features.
    - **Song List**: Displays the full list of karaoke tracks, each with an action to enter Sing Mode.
    - **Singing Interface**: Dedicated area for lyric display, recording controls, filter selection, and playback.
    - **Contact**: Simple contact or feedback page (static content).
- Each route corresponds to a React component or sub-tree; routing may be implemented via React Router in future phases if not yet present.

---

## 4. Page and Component Breakdown

### 4.1 App Container

- Top-level React component (`App`) wraps the entire UI.
- Applies global theming, styling, and provides navigation.

### 4.2 Navbar

- Fixed at the top, always visible.
- Contains logo/brand ("KAVIA AI" or KaraokeVibe), and navigation links.
- Responsive, with appropriate padding and spacing.

### 4.3 Song List

- Scrollable list in card or table format.
- Each item offers "Sing" action.
- Simple, readable layout.

### 4.4 Singing Interface

- Prominent, large-typography lyrics shown over dark or semi-transparent background.
- Audio playback and recording controls.
- Filter selector as buttons or dropdown.

### 4.5 Recording Controls

- Large, intuitive record/stop buttons.
- Visual recording indicator (color change or label).

### 4.6 Filters

- Display filter choices clearly.
- Active filter is visually distinct.
- Optional toggle for real-time preview.

### 4.7 Playback, Save, and Share

- "Play" button for listening to the recording with chosen filter.
- "Save" for download/local save.
- Simple "Share" functionality as feasible for frontend.

### 4.8 Contact Page

- Static content with branding or contact details.

---

## 5. Theming and Styling

- Brand colors utilize CSS variables (see `App.css` for current palette):
    - Primary (base-light): #00ffff
    - Dark background (base-dark): #00008b (MVP), eventual #1A1A1A for final brand match
    - Text: #ffffff and secondary rgba(255, 255, 255, 0.7)
    - Accent: Not yet implemented; anticipated for call-to-actions and highlights
- All components must maintain modern, clean, and consistent styling.
- UI elements such as buttons have rounded corners, bold/clear typography, and hover/active states.

---

## 6. UI/UX Guidelines

- Consistent spacing and alignment using CSS Flexbox.
- Readable font sizes for headings (very large for lyrics), buttons, and navigation.
- Avoid visual clutter; maintain generous padding/margins.
- Main user flows (browsing, singing, recording, saving) should be reachable in 1–2 clicks from anywhere.
- All interactive elements use clear pointer cursors and/or visual feedback.

---

## 7. Key Behavioral Expectations

- Song playback and lyric syncing must remain smooth; UI must remain responsive during recordings.
- Transitions between navigation states (Home, Song List, Singing Interface) should be near-instant with visual continuity.
- Recording should give immediate audio feedback upon completion, especially with filters applied.
- Saving and sharing actions should provide obvious success states.

---

## 8. Out of Scope (MVP/Current Phase)

- No authentication or user accounts.
- No server-side backend or external databases.
- No live social/media API integrations (share is local/demo only).
- No payment, premium content, or locked features.
- Mobile support is desirable, but desktop experience is the core MVP focus.

---

## 9. Future Enhancements (not required now)

- Actual user authentication, persistent user profiles, robust share integrations.
- More advanced audio analysis, scoring, or community features.
- Extended theming, personalization, or light/dark mode toggle.

---

## References

- See `karaoke_app/src/App.js` for current top-level structure.
- See `karaoke_app/README.md` and `karaoke_app/src/App.css` for theming and basic UX patterns.

---
