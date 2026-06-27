import React from 'react';
import { IonPage, IonContent, IonIcon } from '@ionic/react';
import { callOutline, mailOutline, personCircleOutline } from 'ionicons/icons';
import AppHeader from '../components/AppHeader';
import './AboutUs.css';

interface Developer {
  name: string;
  role: string;
  note: string;
  image?: string;
}

// TODO: confirm final roles/notes with the team, and add real photos
// before publishing, e.g. image: '/assets/developers/francis.jpg'.
const developers: Developer[] = [
  {
    name: 'Francis Adrian Idul',
    role: 'Project Lead / Full-Stack Developer',
    note: 'Leads system design, mobile app, and backend integration.',
  },
  {
    name: 'Troy M. Rojo',
    role: 'Hardware & IoT Developer',
    note: 'Handles sensor integration and ESP32 firmware.',
  },
  {
    name: 'Rhics T. Geonzon',
    role: 'Researcher / Documentation Lead',
    note: 'Handles research writing and system evaluation.',
  },
];

const AboutUsPage: React.FC = () => {
  return (
    <IonPage>
      <AppHeader title="About Us" />
      <IonContent fullscreen className="adw-page-content">
        <div className="adw-about-card">
          <h2 className="adw-section-title">About AdlaWatt</h2>
          <p className="adw-about-text">
            AdlaWatt is an IoT-based, portable off-grid solar energy harvesting system
            built for households affected by frequent power interruptions. It stores
            solar energy in a battery housed inside a lockable, portable enclosure and
            supplies electricity through a built-in power outlet, while this mobile app
            gives users real-time visibility into energy generation, battery status, and
            consumption.
          </p>
          <p className="adw-about-text">
            The project supports the UN Sustainable Development Goals on Affordable and
            Clean Energy, Sustainable Cities and Communities, and Climate Action by
            promoting accessible renewable energy for everyday households.
          </p>
        </div>

        <div className="adw-about-card">
          <h2 className="adw-section-title">Developers</h2>
          {developers.map((dev) => (
            <div key={dev.name} className="adw-dev-row">
              <div className="adw-dev-avatar">
                {/* TODO: replace with <img src={dev.image} alt={dev.name} /> */}
                <IonIcon icon={personCircleOutline} />
              </div>
              <div className="adw-dev-info">
                <p className="adw-dev-name">{dev.name}</p>
                <span className="adw-dev-role">{dev.role}</span>
                <p className="adw-dev-note">{dev.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="adw-about-card">
          <h2 className="adw-section-title">Contact Details</h2>
          {/* TODO: replace with the team's real contact number and email */}
          <div className="adw-contact-row">
            <IonIcon icon={callOutline} />
            <span>+63 9XX XXX XXXX</span>
          </div>
          <div className="adw-contact-row">
            <IonIcon icon={mailOutline} />
            <span>adlawatt.nbsc@example.com</span>
          </div>
        </div>

        <p className="adw-about-footer">AdlaWatt2026 · Northern Bukidnon State College</p>
      </IonContent>
    </IonPage>
  );
};

export default AboutUsPage;
