import React, { useEffect } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './OpeningPage.css';

// Splash/opening screen. Shows the animated AdlaWatt logo for ~3 seconds,
// then automatically navigates to the Dashboard. No header/menu here.
const OpeningPage: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    const timer = setTimeout(() => {
      history.replace('/dashboard');
    }, 3000);
    return () => clearTimeout(timer);
  }, [history]);

  return (
    <IonPage>
      <IonContent fullscreen className="adw-opening-content">
        <div className="adw-opening-wrapper">
          {/* TODO: Replace this placeholder mark with the real AdlaWatt logo
              animation, e.g. a Lottie file, video, or
              <img src="/assets/logo-animated.gif" alt="AdlaWatt" /> */}
          <div className="adw-opening-logo">
            <span className="adw-opening-sun">☀️</span>
          </div>
          <h1 className="adw-opening-title">AdlaWatt</h1>
          <p className="adw-opening-subtitle">Off-grid Solar Energy, Monitored Anywhere</p>
          <div className="adw-opening-loading">
            <span />
            <span />
            <span />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default OpeningPage;
