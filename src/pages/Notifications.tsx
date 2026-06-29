import React, { useState } from 'react';
import { IonPage, IonContent, IonSegment, IonSegmentButton, IonLabel, IonIcon, IonButton } from '@ionic/react';
import {
  wifiOutline,
  batteryHalfOutline,
  thermometerOutline,
  sunnyOutline,
  hardwareChipOutline,
  checkmarkDoneOutline,
} from 'ionicons/icons';
import AppHeader from '../components/AppHeader';
import { useAppData } from '../context/AppDataContext';
import { filterByTimeRange, TimeRange } from '../utils/dateFilter';
import { NotificationType } from '../data/mockData';
import './Notifications.css';

const TYPE_ICON: Record<NotificationType, string> = {
  network: wifiOutline,
  battery: batteryHalfOutline,
  temperature: thermometerOutline,
  weather: sunnyOutline,
  component: hardwareChipOutline,
};

// Notifications cover: device online/offline, battery low/full, intense
// battery temperature (TODO: trigger phone vibration via Capacitor
// Haptics on these), temperature back to normal, outdoor weather change,
// and components going inactive/disconnected.
const NotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useAppData();
  const [range, setRange] = useState<TimeRange>('day');

  const filtered = filterByTimeRange(notifications, range);

  return (
    <IonPage>
      <AppHeader title="Notifications" />
      <IonContent fullscreen className="adw-page-content">
        <div className="adw-notif-toolbar">
          <IonSegment
            value={range}
            className="adw-segment"
            scrollable
            onIonChange={(e) => setRange((e.detail.value as TimeRange) ?? 'day')}
          >
            <IonSegmentButton value="hour"><IonLabel>Last Hour</IonLabel></IonSegmentButton>
            <IonSegmentButton value="day"><IonLabel>Last Day</IonLabel></IonSegmentButton>
            <IonSegmentButton value="week"><IonLabel>Last Week</IonLabel></IonSegmentButton>
            <IonSegmentButton value="year"><IonLabel>Last Year</IonLabel></IonSegmentButton>
          </IonSegment>
          <IonButton fill="clear" size="small" onClick={markAllNotificationsRead} className="adw-mark-all-btn">
            <IonIcon icon={checkmarkDoneOutline} slot="start" />
            Mark all as read
          </IonButton>
        </div>

        <div className="adw-log-list">
          {/* TODO(hardware/backend): Generate these server-side whenever the
              ESP32 reports a state change (network status, battery
              thresholds, temperature thresholds, weather change, or a
              component losing connection). For "temperature" notifications,
              also trigger a phone vibration using the Capacitor Haptics
              plugin, e.g. `Haptics.vibrate()`. */}
          {filtered.map((n) => (
            <div
              key={n.id}
              className={`adw-log-card adw-notif-card ${n.read ? '' : 'unread'}`}
              onClick={() => markNotificationRead(n.id)}
            >
              <IonIcon icon={TYPE_ICON[n.type]} className="adw-notif-icon" />
              <div>
                <p className="adw-log-title">{n.title}</p>
                <p className="adw-log-desc">{n.description}</p>
                <p className="adw-log-time">{new Date(n.timestamp).toLocaleString()}</p>
              </div>
              {!n.read && <span className="adw-notif-unread-dot" />}
            </div>
          ))}
          {filtered.length === 0 && <p className="adw-empty-state">No notifications for this period.</p>}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default NotificationsPage;
