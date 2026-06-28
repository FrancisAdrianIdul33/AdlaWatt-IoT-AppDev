// =====================================================================
// MOCK / PLACEHOLDER DATA
// -----------------------------------------------------------------------
// Everything below is TEMPORARY sample data so the UI has something to
// render before the ESP32 + Supabase backend is wired up.
//
// TODO(hardware/backend): Once the hardware/backend is ready, replace the
// constants in this file with live data fetched from Supabase, e.g.:
//   const { data } = await supabase.from('readings').select('*').single();
// or a realtime subscription:
//   supabase.channel('readings').on('postgres_changes', { ... }, cb).subscribe();
// =====================================================================

import {
  sunnyOutline,
  batteryChargingOutline,
  flashOutline,
  optionsOutline,
  hardwareChipOutline,
  speedometerOutline,
  thermometerOutline,
  syncOutline,
  shieldOutline, toggleOutline, trendingDownOutline, powerOutline, swapVerticalOutline, pulseOutline, analyticsOutline, tabletLandscapeOutline
} from 'ionicons/icons';

export type ComponentStatus = 'active' | 'inactive';
export type ComponentCategory = 'Power' | 'IoT';

export interface SystemComponent {
  id: string;
  name: string;
  type: ComponentCategory;
  status: ComponentStatus;
  description: string;
  icon: string; // placeholder visual (ionicon name/path string)
  image?: string; // TODO(hardware): add a real product photo path, e.g. '/assets/components/solar-panel.jpg'
}

export interface ActivityLogEntry {
  id: string;
  title: string;
  description: string;
  timestamp: string; // ISO date string
}

export type NotificationType = 'network' | 'battery' | 'temperature' | 'weather' | 'component';

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: NotificationType;
  read: boolean;
}

export interface LiveStats {
  batteryPercent: number;
  batteryTimeRemaining: string;
  solarInputWatts: number;
  loadNowWatts: number;
  deviceOnline: boolean;
  batteryTempC: number;
  fanOn: boolean;
  isSunny: boolean;
}

const minutesAgo = (m: number) => new Date(Date.now() - m * 60 * 1000).toISOString();
const hoursAgo = (h: number) => new Date(Date.now() - h * 60 * 60 * 1000).toISOString();
const daysAgo = (d: number) => new Date(Date.now() - d * 24 * 60 * 60 * 1000).toISOString();

// TODO(hardware): Replace with the realtime row pulled from Supabase, updated
// by the ESP32 + INA219/INA226 (power) + DS18B20 (temperature) sensors.
export const liveStats: LiveStats = {
  batteryPercent: 50,
  batteryTimeRemaining: '0h 4min 12secs',
  solarInputWatts: 46,
  loadNowWatts: 170,
  deviceOnline: true,
  batteryTempC: 20.0,
  fanOn: false,
  isSunny: true,
};

// TODO(hardware/backend): Replace with a query against an `energy_history`
// table (e.g. hourly Wh harvested) for the Dashboard bar chart.
export const statisticsHistory: number[] = [4, 7, 5, 9, 6, 8, 10, 7, 6, 9, 5, 8];

// TODO(hardware/backend): Replace with rows from a `components` table that
// the ESP32/backend updates whenever a component connects, disconnects, or
// fails a health check.
export const componentsList: SystemComponent[] = [
  {
    id: 'c1',
    name: 'Solar Panel (60x40)',
    type: 'Power',
    status: 'active',
    description: 'Harvests sunlight and converts it into electrical energy to charge the AdlaWatt battery.',
    icon: sunnyOutline,
  },
  {
    id: 'c2',
    name: 'INA219 Current/Voltage Sensor',
    type: 'IoT',
    status: 'active',
    description: 'Measures real-time solar panel voltage and current for accurate solar input monitoring.',
    icon: speedometerOutline,
  },
  {
    id: 'c3',
    name: 'Surge Protection Device',
    type: 'Power',
    status: 'active',
    description: 'Protects the AdlaWatt system from voltage spikes and lightning-induced surges.',
    icon: shieldOutline,
  },
  {
    id: 'c4',
    name: 'Breaker',
    type: 'Power',
    status: 'active',
    description: "Cuts off the circuit automatically during overcurrent to protect AdlaWatt's components.",
    icon: toggleOutline,
  },
  {
    id: 'c5',
    name: 'Charge Controller',
    type: 'Power',
    status: 'active',
    description: 'Regulates solar charging and prevents overcharging or deep discharge of the battery.',
    icon: optionsOutline,
  },
  {
    id: 'c6',
    name: 'Buck Converter',
    type: 'Power',
    status: 'active',
    description: 'Steps down voltage from the charge controller to safely power the ESP32 and sensors.',
    icon: trendingDownOutline,
  },
  {
    id: 'c7',
    name: 'Battery (11 Plates)',
    type: 'Power',
    status: 'active',
    description: 'Stores harvested solar energy so AdlaWatt can supply power during electricity interruptions.',
    icon: batteryChargingOutline,
  },
  {
    id: 'c8',
    name: 'Voltage Sensor',
    type: 'IoT',
    status: 'active',
    description: "Tracks the battery's voltage levels to support accurate state-of-charge readings.",
    icon: analyticsOutline,
  },
  {
    id: 'c9',
    name: 'INA226 Current/Voltage Sensor',
    type: 'IoT',
    status: 'active',
    description: 'Measures real-time battery and load current/voltage for energy consumption monitoring.',
    icon: pulseOutline,
  },
  {
    id: 'c10',
    name: 'Relay (5V) 1 Channel',
    type: 'IoT',
    status: 'active',
    description: 'Switches the power outlet on or off automatically based on ESP32 commands.',
    icon: powerOutline,
  },
  {
    id: 'c11',
    name: 'Inverter 1000',
    type: 'Power',
    status: 'active',
    description: 'Converts stored DC battery power into AC electricity for household devices.',
    icon: swapVerticalOutline,
  },
  {
    id: 'c12',
    name: 'Outlet',
    type: 'Power',
    status: 'active',
    description: 'Built-in power outlet that supplies electricity to compatible household devices.',
    icon: flashOutline,
  },
  {
    id: 'c13',
    name: 'ESP32 Microcontroller',
    type: 'IoT',
    status: 'active',
    description: 'Central microcontroller that reads sensor data and syncs it to the mobile app.',
    icon: hardwareChipOutline,
  },
  {
    id: 'c14',
    name: 'LCD2004 Display',
    type: 'IoT',
    status: 'inactive',
    description: 'Displays live system readings directly on the AdlaWatt enclosure.',
    icon: tabletLandscapeOutline,
  },
  {
    id: 'c15',
    name: 'DS18B20 Temperature Sensor',
    type: 'IoT',
    status: 'inactive',
    description: 'Monitors battery temperature to help prevent overheating and trigger cooling.',
    icon: thermometerOutline,
  },
];

// TODO(hardware/backend): Replace with a paginated query against an
// `activity_logs` table populated by the ESP32/backend on every state change.
export const activityLogs: ActivityLogEntry[] = [
  {
    id: 'a1',
    title: 'Battery fully charged',
    description: 'Battery reached 100% after 3 hours of sunlight exposure.',
    timestamp: minutesAgo(20),
  },
  {
    id: 'a2',
    title: 'Solar input increased',
    description: 'Solar input rose from 18W to 46W as cloud cover cleared.',
    timestamp: minutesAgo(50),
  },
  {
    id: 'a3',
    title: 'Device reconnected',
    description: 'AdlaWatt unit reconnected to the home Wi-Fi network.',
    timestamp: hoursAgo(3),
  },
  {
    id: 'a4',
    title: 'Cooling fan activated',
    description: 'Fan turned on automatically after battery reached 42°C.',
    timestamp: hoursAgo(9),
  },
  {
    id: 'a5',
    title: 'Power outlet in use',
    description: 'A household device was plugged into the built-in outlet.',
    timestamp: daysAgo(2),
  },
  {
    id: 'a6',
    title: 'Weekly summary generated',
    description: 'AdlaWatt harvested an estimated 5.4 kWh of solar energy this week.',
    timestamp: daysAgo(6),
  },
  {
    id: 'a7',
    title: 'Firmware check completed',
    description: 'ESP32 confirmed it is running the latest firmware version.',
    timestamp: daysAgo(40),
  },
];

// TODO(hardware/backend): Trigger these server-side from the
// ESP32/backend whenever a threshold is crossed. Pair the "temperature"
// type with a device vibration using the Capacitor Haptics plugin.
export const notifications: AppNotification[] = [
  {
    id: 'n1',
    title: 'Device is online',
    description: 'AdlaWatt reconnected to your home network.',
    timestamp: minutesAgo(5),
    type: 'network',
    read: false,
  },
  {
    id: 'n2',
    title: 'Battery is almost full',
    description: 'Battery is at 92% and charging.',
    timestamp: minutesAgo(35),
    type: 'battery',
    read: false,
  },
  {
    id: 'n3',
    title: 'Battery temperature is high',
    description: 'Battery reached 44°C. Cooling fan has been activated.',
    timestamp: hoursAgo(2),
    type: 'temperature',
    read: false,
  },
  {
    id: 'n4',
    title: 'Battery temperature back to normal',
    description: 'Battery temperature dropped back to 31°C.',
    timestamp: hoursAgo(2.5),
    type: 'temperature',
    read: true,
  },
  {
    id: 'n5',
    title: "Today's weather: Sunny",
    description: 'Expect strong solar input for most of the day.',
    timestamp: hoursAgo(6),
    type: 'weather',
    read: true,
  },
  {
    id: 'n6',
    title: 'Temperature sensor unable to connect',
    description: 'DS18B20 sensor did not respond to the last health check.',
    timestamp: daysAgo(1),
    type: 'component',
    read: false,
  },
  {
    id: 'n7',
    title: 'Device went offline',
    description: 'AdlaWatt lost connection to the home Wi-Fi network.',
    timestamp: daysAgo(3),
    type: 'network',
    read: true,
  },
  {
    id: 'n8',
    title: 'Battery was low',
    description: 'Battery dropped to 15%. Consider repositioning the solar panel.',
    timestamp: daysAgo(50),
    type: 'battery',
    read: true,
  },
];
