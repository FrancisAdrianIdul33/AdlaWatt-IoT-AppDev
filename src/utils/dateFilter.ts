// Shared helper for the "Last Hour / Last Day / Last Week / Last Year"
// sorting toggles used on the Activity Logs and Notifications pages.

export type TimeRange = 'hour' | 'day' | 'week' | 'year';

const RANGE_MS: Record<TimeRange, number> = {
  hour: 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
  week: 7 * 24 * 60 * 60 * 1000,
  year: 365 * 24 * 60 * 60 * 1000,
};

export const filterByTimeRange = <T extends { timestamp: string }>(
  items: T[],
  range: TimeRange,
  now: Date = new Date()
): T[] => {
  const cutoff = now.getTime() - RANGE_MS[range];
  return items
    .filter((item) => new Date(item.timestamp).getTime() >= cutoff)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};
