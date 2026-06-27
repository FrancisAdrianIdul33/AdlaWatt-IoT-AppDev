import React from 'react';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonButton, IonIcon } from '@ionic/react';
import { notificationsOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAppData } from '../context/AppDataContext';
import './AppHeader.css';

interface AppHeaderProps {
  title: string;
}

// Shared top bar used on every page except the Opening (splash) page.
// Contains the hamburger menu button (left) and the notification bell
// (right), which shows a red dot whenever there are unread notifications.
const AppHeader: React.FC<AppHeaderProps> = ({ title }) => {
  const history = useHistory();
  const { unreadNotificationsCount } = useAppData();

  return (
    <IonHeader className="ion-no-border">
      <IonToolbar className="adw-toolbar">
        <IonButtons slot="start">
          <IonMenuButton className="adw-menu-btn" />
        </IonButtons>
        <IonTitle className="adw-toolbar-title">{title}</IonTitle>
        <IonButtons slot="end">
          <IonButton className="adw-notif-btn" onClick={() => history.push('/notifications')}>
            <IonIcon icon={notificationsOutline} slot="icon-only" />
            {/* TODO(hardware/backend): `unreadNotificationsCount` comes from
                AppDataContext and should reflect real unread rows from
                Supabase once notifications are generated server-side. */}
            {unreadNotificationsCount > 0 && <span className="adw-notif-dot" />}
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default AppHeader;
