# How Dumbbell was built

A practical path you can follow with the rebuild prompt on this page and the reference images below.

## 1. Lock the product, not the pixels

Start from a short plan: free, offline, no login, log sets, timer with resume, history, progress, local export. Cut nutrition, social, and anything that needs a server. Write the privacy story early — on-device storage, user-initiated share/export only.

## 2. Steal the visual language, not the feature set

Study dark + lime fitness references (see the gallery). Extract tokens: near-black canvas, charcoal cards, chartreuse CTAs, bold type. Ignore community feeds and calorie widgets that are not in scope. Build empty states in the same system so the first open still feels finished.

## 3. Scaffold Flutter with a clear domain core

Create models for workout, exercise, set, body-weight entry, and settings. Add a versioned local repository (Sembast works well). Put GetX routes/bindings around feature pages: home, live workout, library, progress, history, settings.

## 4. Ship the live workout loop first

Start workout → show elapsed timer → add exercises → log sets → finish or discard. Persist the draft continuously so a kill/restart can resume. This path is the product; charts and polish wait until logging feels fast.

## 5. History, edit, and progress

List past sessions, allow edit/delete, then add charts for load over time, training-day calendar, and body weight. Keep units consistent (store kg, display kg/lb).

## 6. Library, photos, share, backup

Bundle exercise cues offline. Add optional workout photos and a shareable summary through the system share sheet. Export readable CSV and a Backup CSV that the app can import again. Document that photos/profile stay out of backups if that is your policy.

## 7. Release hygiene

Host a public privacy policy URL (this site’s `/app/dumbbell/privacy`), wire store listing copy, sign the Android release, and test on a real device. Prefer flexible Play updates over any forced gate that blocks offline use.
