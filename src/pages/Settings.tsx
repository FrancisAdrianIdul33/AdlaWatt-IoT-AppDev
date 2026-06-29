import React from 'react';
import { IonPage, IonContent, IonToggle, IonItem, IonLabel, IonIcon } from '@ionic/react';
import { moonOutline, eyeOutline, textOutline } from 'ionicons/icons';
import AppHeader from '../components/AppHeader';
import { useSettings, FontSizeLevel } from '../context/SettingsContext';
import './Settings.css';

const FONT_LEVELS: FontSizeLevel[] = [1, 2, 3, 4, 5];

const SettingsPage: React.FC = () => {
  const { darkMode, colorBlindMode, fontSize, toggleDarkMode, toggleColorBlindMode, setFontSize } =
    useSettings();

  return (
    <IonPage>
      <AppHeader title="Settings" />
      <IonContent fullscreen className="adw-page-content">
        <div className="adw-settings-card">
          <IonItem lines="none" className="adw-settings-item">
            <IonIcon icon={moonOutline} slot="start" />
            <IonLabel>
              <h3>Dark Mode</h3>
              <p>Switch to a darker theme for low-light use.</p>
            </IonLabel>
            <IonToggle checked={darkMode} onIonChange={toggleDarkMode} />
          </IonItem>

          <IonItem lines="none" className="adw-settings-item">
            <IonIcon icon={eyeOutline} slot="start" />
            <IonLabel>
              <h3>Color Blind Mode</h3>
              <p>Use color-blind friendly colors for statuses and charts.</p>
            </IonLabel>
            <IonToggle checked={colorBlindMode} onIonChange={toggleColorBlindMode} />
          </IonItem>

          <div className="adw-settings-item adw-font-size-block">
            <div className="adw-font-size-label">
              <IonIcon icon={textOutline} />
              <div>
                <h3>Font Size</h3>
                <p>Adjust text size for better readability.</p>
              </div>
            </div>
            <div className="adw-font-size-options">
              {/* TODO: `setFontSize` updates the root html font-size via
                  SettingsContext; values map to 13px-20.5px in FONT_SIZE_PX */}
              {FONT_LEVELS.map((level) => (
                <button
                  key={level}
                  className={`adw-font-size-btn ${fontSize === level ? 'active' : ''}`}
                  onClick={() => setFontSize(level)}
                  aria-label={`Font size level ${level}`}
                  style={{ fontSize: `${0.7 + level * 0.08}rem` }}
                >
                  A
                </button>
              ))}
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SettingsPage;
