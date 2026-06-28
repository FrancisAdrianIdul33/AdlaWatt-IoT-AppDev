import React from 'react';
import { IonPage, IonContent, IonCard, IonCardContent, IonIcon } from '@ionic/react';
import { bulbOutline, sunnyOutline, cloudyOutline, flashOutline, thermometerOutline, wifiOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import BatteryGauge from '../components/BatteryGauge';
import { useAppData } from '../context/AppDataContext';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const { liveStats, statisticsHistory, activityLogs, tipOfTheDay } = useAppData();
  const history = useHistory();
  const maxStat = Math.max(...statisticsHistory, 1);

  return (
    <IonPage>
      <AppHeader title="Dashboard" />
      <IonContent fullscreen className="adw-page-content">
        {/* Tip of the Day */}
        <IonCard className="adw-card adw-tip-card">
          <IonCardContent>
            <div className="adw-tip-header">
              <IonIcon icon={bulbOutline} />
              <span>Tip of the Day</span>
            </div>
            {/* TODO(backend): `tipOfTheDay` is generated in
                utils/tipOfTheDay.ts from the current liveStats snapshot.
                Swap in a backend-generated tip once trend analysis is available. */}
            <p className="adw-tip-text">{tipOfTheDay}</p>
          </IonCardContent>
        </IonCard>

        {/* Real-Time Monitoring */}
        <IonCard className="adw-card">
          <IonCardContent>
            <h2 className="adw-section-title">Real-Time Monitoring</h2>
            <div className="adw-gauge-row">
              {/* TODO(hardware): battery % + time remaining come from the
                  battery monitoring circuit / fuel gauge reading */}
              <BatteryGauge
                percent={liveStats.batteryPercent}
                subLabel={`Time Remaining: ${liveStats.batteryTimeRemaining}`}
              />
            </div>
            <div className="adw-metric-grid">
              <div className="adw-metric">
                <span className="adw-metric-label">Solar Input</span>
                {/* TODO(hardware): read from INA219/INA226 on the solar input line */}
                <span className="adw-metric-value">{liveStats.solarInputWatts}W</span>
              </div>
              <div className="adw-metric">
                <span className="adw-metric-label">Load Now</span>
                {/* TODO(hardware): read from INA219/INA226 on the output line */}
                <span className="adw-metric-value">{liveStats.loadNowWatts}W</span>
              </div>
              <div className="adw-metric">
                <span className="adw-metric-label">Device</span>
                {/* TODO(hardware): derived from the ESP32's last-seen heartbeat in Supabase */}
                <span className={`adw-metric-value ${liveStats.deviceOnline ? 'adw-good' : 'adw-bad'}`}>
                  <IonIcon icon={wifiOutline} /> {liveStats.deviceOnline ? 'Online' : 'Offline'}
                </span>
              </div>
              <div className="adw-metric">
                <span className="adw-metric-label">Battery Temp</span>
                {/* TODO(hardware): read from the DS18B20 sensor on the battery pack */}
                <span className="adw-metric-value">
                  <IonIcon icon={thermometerOutline} /> {liveStats.batteryTempC.toFixed(1)}°C
                </span>
              
              </div>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Statistics */}
        <IonCard className="adw-card">
          <IonCardContent>
            <h2 className="adw-section-title">Statistics</h2>
            <div className="adw-bar-chart">
              {/* TODO(hardware/backend): replace `statisticsHistory` with the
                  hourly/daily energy-harvested totals queried from Supabase */}
              {statisticsHistory.map((value, idx) => (
                <div key={idx} className="adw-bar" style={{ height: `${(value / maxStat) * 100}%` }} />
              ))}
            </div>
            <div className="adw-stat-footer">
              <div className="adw-stat-chip">
                <IonIcon icon={flashOutline} /> Energy Harvested Trend
              </div>
              <div className="adw-stat-chip">
                {/* TODO(hardware): replace with a real light/weather sensor
                    reading, or a weather API call keyed to the device location */}
                <IonIcon icon={liveStats.isSunny ? sunnyOutline : cloudyOutline} />
                {liveStats.isSunny ? 'Sunny' : 'Cloudy'}
              </div>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Recent Activity */}
        <IonCard className="adw-card">
          <IonCardContent>
            <div className="adw-section-header-row">
              <h2 className="adw-section-title">Recent Activity</h2>
              <button className="adw-link-btn" onClick={() => history.push('/activity-logs')}>
                View all
              </button>
            </div>
            <ul className="adw-activity-list">
              {/* TODO(hardware/backend): `activityLogs` should come from the
                  `activity_logs` table in Supabase, ordered by newest first */}
              {activityLogs.slice(0, 4).map((log) => (
                <li key={log.id} className="adw-activity-item">
                  <span className="adw-activity-dot" />
                  <div>
                    <p className="adw-activity-title">{log.title}</p>
                    <p className="adw-activity-time">{new Date(log.timestamp).toLocaleString()}</p>
                  </div>
                </li>
              ))}
            </ul>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
