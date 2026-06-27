import React, { useState } from 'react';
import { IonPage, IonContent, IonSegment, IonSegmentButton, IonLabel, IonIcon } from '@ionic/react';
import AppHeader from '../components/AppHeader';
import { useAppData } from '../context/AppDataContext';
import { ComponentStatus } from '../data/mockData';
import './ComponentsPage.css';

type FilterValue = ComponentStatus | 'all';

// Lists every hardware/IoT component so the user can quickly tell which
// parts of the AdlaWatt unit are active vs. not connecting.
const ComponentsPage: React.FC = () => {
  const { components } = useAppData();
  const [filter, setFilter] = useState<FilterValue>('all');

  const filtered = components.filter((c) => filter === 'all' || c.status === filter);

  return (
    <IonPage>
      <AppHeader title="Components" />
      <IonContent fullscreen className="adw-page-content">
        <IonSegment
          value={filter}
          className="adw-segment"
          onIonChange={(e) => setFilter((e.detail.value as FilterValue) ?? 'all')}
        >
          <IonSegmentButton value="active"><IonLabel>Active</IonLabel></IonSegmentButton>
          <IonSegmentButton value="inactive"><IonLabel>Inactive</IonLabel></IonSegmentButton>
          <IonSegmentButton value="all"><IonLabel>All</IonLabel></IonSegmentButton>
        </IonSegment>

        <div className="adw-component-grid">
          {/* TODO(hardware/backend): `components` comes from AppDataContext,
              which should eventually read the `components` table in
              Supabase that the ESP32/backend updates on every health check. */}
          {filtered.map((component) => (
            <div key={component.id} className="adw-component-card">
              <span className={`adw-component-status-dot ${component.status}`} />
              {/* TODO(hardware): swap this icon for a real product photo
                  once available, e.g.:
                  <img src={component.image} alt={component.name} /> */}
              <div className="adw-component-icon">
                <IonIcon icon={component.icon} />
              </div>
              <p className="adw-component-name">{component.name}</p>
              <span className={`adw-component-type ${component.type.toLowerCase()}`}>{component.type}</span>
              <p className="adw-component-desc">{component.description}</p>
              <span className={`adw-component-status-label ${component.status}`}>
                {component.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </div>
          ))}
          {filtered.length === 0 && <p className="adw-empty-state">No components match this filter yet.</p>}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ComponentsPage;
