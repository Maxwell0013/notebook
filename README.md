# Notebook

A single-page note-taker that **nudges you every hour to jot down what you're working
on** — and the nudges fire even when the tab or browser is closed.

**Live:** https://maxwell0013.github.io/notebook/

## Why it exists
Built to run on a locked-down work laptop where nothing can be installed. It's just a
hosted web page: open the URL, allow notifications once, and it sits in the background
reminding you to capture progress. Notes export to Markdown for filing into a personal
Obsidian vault.

## How it works
- **Closed-tab nudges, no server.** A service worker uses the Notification Triggers API
  (`TimestampTrigger`) to schedule a rolling window of hourly notifications. They fire
  even with the tab/browser closed — no backend to run. *Chromium only (Chrome / Edge);*
  other browsers fall back to in-page nudges that need the tab open.
- **Autosave.** Notes and title persist to `localStorage` — a refresh never loses work.
- **Timestamps.** "+ Time stamp" drops a `## HH:MM` heading at the cursor.
- **Export.** "Export .md" downloads `Notes YYYY-MM-DD HHMM.md` for the transfer →
  ingest pipeline.

## Files
| File | Purpose |
|------|---------|
| `index.html` | The whole app (markup, styling, logic). |
| `sw.js` | Service worker — notification clicks + scheduled/push delivery. |
| `manifest.webmanifest` | PWA manifest (installable as an app window). |
| `icon.svg` | App icon. |

## Notes
- Notifications require an HTTPS origin — that's why it's hosted, not opened as a local
  file. (A `file://` page can't show notifications, which is what broke the earlier
  local-HTML version.)
- A corporate browser policy or Windows Focus Assist can still suppress notifications;
  that's environment, not the app.
- No data leaves the browser. The repo is the app shell only.
