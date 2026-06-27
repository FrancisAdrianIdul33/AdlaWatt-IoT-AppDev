import React, { createContext, useContext, useEffect, useState } from 'react';

export type FontSizeLevel = 1 | 2 | 3 | 4 | 5;

interface SettingsState {
  darkMode: boolean;
  colorBlindMode: boolean;
  fontSize: FontSizeLevel;
}

interface SettingsContextValue extends SettingsState {
  toggleDarkMode: () => void;
  toggleColorBlindMode: () => void;
  setFontSize: (level: FontSizeLevel) => void;
}

const STORAGE_KEY = 'adlawatt-settings';

const FONT_SIZE_PX: Record<FontSizeLevel, number> = {
  1: 13,
  2: 14.5,
  3: 16,
  4: 18,
  5: 20.5,
};

// TODO(production): Replace localStorage with @capacitor/preferences so
// settings persist reliably as native app storage on iOS/Android, e.g.:
//   import { Preferences } from '@capacitor/preferences';
//   await Preferences.set({ key: STORAGE_KEY, value: JSON.stringify(settings) });
const loadSettings = (): SettingsState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as SettingsState;
  } catch {
    /* ignore parse errors and fall back to defaults */
  }
  return { darkMode: false, colorBlindMode: false, fontSize: 3 };
};

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SettingsState>(loadSettings);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));

    const root = document.documentElement;
    root.classList.toggle('adw-dark', settings.darkMode);
    root.classList.toggle('adw-colorblind', settings.colorBlindMode);
    root.style.fontSize = `${FONT_SIZE_PX[settings.fontSize]}px`;
  }, [settings]);

  const toggleDarkMode = () => setSettings((s) => ({ ...s, darkMode: !s.darkMode }));
  const toggleColorBlindMode = () =>
    setSettings((s) => ({ ...s, colorBlindMode: !s.colorBlindMode }));
  const setFontSize = (level: FontSizeLevel) => setSettings((s) => ({ ...s, fontSize: level }));

  return (
    <SettingsContext.Provider
      value={{ ...settings, toggleDarkMode, toggleColorBlindMode, setFontSize }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextValue => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within a SettingsProvider');
  return ctx;
};
