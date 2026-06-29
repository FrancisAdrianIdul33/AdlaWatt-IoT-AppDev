import React from 'react';
import './BatteryGauge.css';

interface BatteryGaugeProps {
  percent: number; // 0-100
  size?: number;
  subLabel?: string; // e.g. "Time Remaining: 0h 4min 12secs"
}

// Circular "sun-arc" style gauge used on the Dashboard to represent the
// current battery charge level.
//
// TODO(hardware): `percent` should come from the live battery state-of-charge
// reading (derived from the INA219/INA226 voltage curve or a dedicated fuel
// gauge IC), not a hardcoded value.
const BatteryGauge: React.FC<BatteryGaugeProps> = ({ percent, size = 160, subLabel }) => {
  const clamped = Math.max(0, Math.min(100, percent));
  const radius = size / 2 - 12;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;
  const center = size / 2;

  return (
    <div className="adw-gauge" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="adwGaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--adw-orange-2)" />
            <stop offset="100%" stopColor="var(--adw-orange-1)" />
          </linearGradient>
        </defs>
        <circle cx={center} cy={center} r={radius} className="adw-gauge-track" fill="none" strokeWidth={12} />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          strokeWidth={12}
          strokeLinecap="round"
          stroke="url(#adwGaugeGradient)"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${center} ${center})`}
          className="adw-gauge-progress"
        />
      </svg>
      <div className="adw-gauge-label">
        <span className="adw-gauge-percent">{Math.round(clamped)}%</span>
        <span className="adw-gauge-caption">Battery</span>
        {subLabel && <span className="adw-gauge-sub">{subLabel}</span>}
      </div>
    </div>
  );
};

export default BatteryGauge;
