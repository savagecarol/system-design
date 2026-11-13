# Rebuild prompt — Dumbbell

Copy and adapt this prompt if you want to rebuild a similar app with an AI coding agent.

---

Build a free, offline-first mobile workout tracker called **Dumbbell**.

## Product rules

- No accounts, no login, no training-data backend, no subscriptions. Google AdMob supports the free app with a History banner and an interstitial after every second completed workout when available; save first and retain normal close/skip controls.
- All workout and profile data stays in private on-device storage by default.
- Users can export backups; uninstalling or losing the device can delete local data — make that clear in Settings.
- Target Android first. Keep the app usable fully offline.

## Core features

1. Start a workout with a persistent elapsed timer. If the user leaves mid-workout, let them resume or discard the draft.
2. Log exercises with sets: reps + weight. Support kg and lb (store weight in kg; convert for display/input).
3. Browse an exercise library with short form cues / illustrations bundled offline.
4. View history: browse, edit, and delete past workouts, sets, and body-weight entries.
5. Progress: charts for exercise performance, workout consistency (calendar), and body-weight history.
6. Optional post-workout photo + shareable summary image via the system share sheet.
7. CSV export of workouts and a Backup CSV import that restores the app’s own export format.
8. Settings for units, data export/import, and a readable privacy policy.

## Visual direction

- Dark shell: background `#10110F`, surfaces `#1C1E1A`.
- Accent lime `#D5FF3F` for primary actions and selected states.
- Text `#F5F5EF`, secondary `#A8ACA0`.
- Large bold headlines, rounded cards (~20–24px), lime-filled primary buttons with dark text.
- Mobile-first, fast set entry over decorative chrome. Restrained motion only where it helps (timer, set logged feedback).

## Architecture preferences

- Flutter + GetX for routing, bindings, and reactive controllers.
- Immutable serializable domain models.
- Local database (Sembast) with a schema version; never wipe unknown future fields.
- One application-level workout controller coordinating the live session and persistence.
- Persist the draft on every meaningful edit; derive elapsed time from the start timestamp.

## Explicitly out of scope

Social feeds, calories, trainers, Health Connect medical claims, forced updates, analytics SDKs, and anything that requires an account.
