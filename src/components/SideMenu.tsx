import React from 'react';
import { IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonToolbar, IonIcon } from '@ionic/react';
import {
  speedometerOutline,
  hardwareChipOutline,
  timeOutline,
  notificationsOutline,
  informationCircleOutline,
  settingsOutline,
} from 'ionicons/icons';
import './SideMenu.css';

interface MenuPage {
  title: string;
  url: string;
  icon: string;
}

const menuPages: MenuPage[] = [
  { title: 'Dashboard', url: '/dashboard', icon: speedometerOutline },
  { title: 'Components', url: '/components', icon: hardwareChipOutline },
  { title: 'Activity Logs', url: '/activity-logs', icon: timeOutline },
  { title: 'Notifications', url: '/notifications', icon: notificationsOutline },
  { title: 'About Us', url: '/about', icon: informationCircleOutline },
  { title: 'Settings', url: '/settings', icon: settingsOutline },
];

// Hamburger side menu, available across all pages, linking to Dashboard,
// Components, Activity Logs, Notifications, About Us, and Settings.
const SideMenu: React.FC = () => {
  return (
    <IonMenu contentId="main-content" className="adw-side-menu" type="overlay">
      <IonHeader className="ion-no-border">
        <IonToolbar className="adw-menu-toolbar">
          <div className="adw-menu-brand">
            {/* TODO: replace with the real AdlaWatt logo,
                e.g. <img src="/assets/logo.png" alt="AdlaWatt" /> */}
            <div className="adw-menu-logo">☀️</div>
            <div>
              <div className="adw-menu-brand-title">AdlaWatt</div>
              <div className="adw-menu-brand-sub">Off-grid Solar Monitor</div>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent className="adw-menu-content">
        <IonList lines="none">
          {menuPages.map((page) => (
            <IonMenuToggle key={page.url} autoHide={false}>
              <IonItem button routerLink={page.url} routerDirection="none" className="adw-menu-item">
                <IonIcon icon={page.icon} slot="start" />
                <IonLabel>{page.title}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>
        <p className="adw-menu-footer">AdlaWatt2026</p>
      </IonContent>
    </IonMenu>
  );
};

export default SideMenu;
