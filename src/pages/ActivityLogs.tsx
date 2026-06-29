import React, { useState } from 'react';
import { IonPage, IonContent, IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import AppHeader from '../components/AppHeader';
import { useAppData } from '../context/AppDataContext';
import { filterByTimeRange, TimeRange } from '../utils/dateFilter';
import './ActivityLogs.css';

const ActivityLogsPage: React.FC = () => {
  const { activityLogs } = useAppData();
  const [range, setRange] = useState<TimeRange>('day');

  const filtered = filterByTimeRange(activityLogs, range);

  return (
    <IonPage>
      <AppHeader title="Activity Logs" />
      <IonContent fullscreen className="adw-page-content">
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

        <div className="adw-log-list">
          {/* TODO(hardware/backend): `activityLogs` should be replaced with a
              paginated query against the Supabase `activity_logs` table,
              e.g. supabase.from('activity_logs').select('*').order('timestamp', { ascending: false }) */}
          {filtered.map((log) => (
            <div key={log.id} className="adw-log-card">
              <p className="adw-log-title">{log.title}</p>
              <p className="adw-log-desc">{log.description}</p>
              <p className="adw-log-time">{new Date(log.timestamp).toLocaleString()}</p>
            </div>
          ))}
          {filtered.length === 0 && <p className="adw-empty-state">No activity recorded for this period.</p>}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ActivityLogsPage;
