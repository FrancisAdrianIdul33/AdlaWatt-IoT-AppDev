import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  liveStats as initialLiveStats,
  componentsList as initialComponents,
  activityLogs as initialLogs,
  notifications as initialNotifications,
  statisticsHistory,
  LiveStats,
  SystemComponent,
  ActivityLogEntry,
  AppNotification,
} from '../data/mockData';
import { generateTipOfTheDay } from '../utils/tipOfTheDay';

interface AppDataContextValue {
  liveStats: LiveStats;
  statisticsHistory: number[];
  components: SystemComponent[];
  activityLogs: ActivityLogEntry[];
  notifications: AppNotification[];
  unreadNotificationsCount: number;
  tipOfTheDay: string;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
}

const AppDataContext = createContext<AppDataContextValue | undefined>(undefined);

export const AppDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // TODO(hardware/backend): Replace this local state with a Supabase
  // realtime subscription so `liveStats` updates automatically whenever
  // the ESP32 pushes a new reading, e.g.:
  //   supabase
  //     .channel('readings')
  //     .on('postgres_changes', { event: '*', schema: 'public', table: 'readings' }, (payload) => {
  //       setLiveStats(payload.new);
  //     })
  //     .subscribe();
  const [liveStats] = useState<LiveStats>(initialLiveStats);
  const [components] = useState<SystemComponent[]>(initialComponents);
  const [activityLogs] = useState<ActivityLogEntry[]>(initialLogs);
  const [notifications, setNotifications] = useState<AppNotification[]>(initialNotifications);

  const unreadNotificationsCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications]
  );

  const tipOfTheDay = useMemo(() => generateTipOfTheDay(liveStats), [liveStats]);

  const markNotificationRead = (id: string) =>
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));

  const markAllNotificationsRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <AppDataContext.Provider
      value={{
        liveStats,
        statisticsHistory,
        components,
        activityLogs,
        notifications,
        unreadNotificationsCount,
        tipOfTheDay,
        markNotificationRead,
        markAllNotificationsRead,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = (): AppDataContextValue => {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData must be used within an AppDataProvider');
  return ctx;
};
