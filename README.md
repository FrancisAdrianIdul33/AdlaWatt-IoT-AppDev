# AdlaWatt Mobile App — Page Templates

These files match the folder structure already inside your `src/` directory
(based on your VS Code screenshot). Copy each folder's contents into the
matching folder in your real project — they will merge with what you have
(only `App.tsx` and `theme/variables.css` fully replace your existing files).

## Where everything goes

```
src/
  components/
    AppHeader.tsx / .css      -> shared top bar (hamburger + notification bell)
    SideMenu.tsx / .css       -> hamburger side menu (Dashboard, Components,
                                 Activity Logs, Notifications, About, Settings)
    BatteryGauge.tsx / .css   -> circular "sun-arc" battery % gauge
  pages/
    OpeningPage.tsx / .css    -> 3-second animated splash screen
    Dashboard.tsx / .css      -> Tip of the Day, Real-Time Monitoring,
                                 Statistics, Recent Activity
    ComponentsPage.tsx / .css -> Active/Inactive/All component list
    ActivityLogs.tsx / .css   -> Hour/Day/Week/Year activity history
    Notifications.tsx / .css  -> Hour/Day/Week/Year notifications, mark as read
    AboutUs.tsx / .css        -> About AdlaWatt, developers, contact info
    Settings.tsx / .css       -> Dark mode, color-blind mode, font size
  context/
    SettingsContext.tsx       -> global dark mode / color-blind / font size state
    AppDataContext.tsx        -> global live stats / components / logs / notifications
  data/
    mockData.ts               -> ALL placeholder data lives here
  utils/
    dateFilter.ts              -> powers the Hour/Day/Week/Year sorting toggles
    tipOfTheDay.ts              -> simple rule-based Tip of the Day generator
  theme/
    variables.css               -> your color palette, dark mode, color-blind mode
  App.tsx                        -> routing + menu setup (replaces your current App.tsx)
```

Your existing `pages/Home.tsx` and `components/ExploreContainer.tsx` (the
default Ionic starter files) are no longer used by the routes in the new
`App.tsx` — you can keep or delete them.

## What to replace once the hardware is ready

Search the code for `TODO(hardware)` and `TODO(hardware/backend)` comments —
every one marks a spot that currently shows placeholder/mock data and is
meant to be swapped for a real Supabase read once the ESP32 + sensors are
wired up. The main ones:

- `data/mockData.ts` — `liveStats`, `statisticsHistory`, `componentsList`,
  `activityLogs`, `notifications` are all hardcoded arrays/objects.
- `context/AppDataContext.tsx` — where you'd add the Supabase realtime
  subscription to replace the local `useState` calls.
- `Notifications.tsx` — where temperature alerts should trigger a phone
  vibration via the Capacitor Haptics plugin.
- `AboutUs.tsx` — developer roles/notes/photos are placeholders; confirm and
  update before your defense.
- `SideMenu.tsx` / `OpeningPage.tsx` — both have a placeholder logo (an emoji)
  marked with a TODO to swap in your real AdlaWatt logo/animation.

## Notes

- Built with Ionic React (matches your existing project's structure).
- Font is Inter, loaded via a Google Fonts `@import` in `variables.css` — for
  an offline/production build, switch to `@fontsource/inter` instead (noted
  inline in the file).
- Dark mode and color-blind mode are toggled by adding `adw-dark` /
  `adw-colorblind` classes to `<html>` — see `SettingsContext.tsx`.
- Settings currently persist to `localStorage`. For native iOS/Android builds,
  swap this for `@capacitor/preferences` (noted inline in
  `SettingsContext.tsx`).
