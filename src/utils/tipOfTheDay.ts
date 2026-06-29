import { LiveStats } from '../data/mockData';

// Generates the short "Tip of the Day" message shown on the Dashboard,
// based on the latest readings in `liveStats`.
//
// TODO(backend): This is a simple rule-based placeholder. Once more
// historical data is stored in Supabase, consider replacing this with a
// scheduled backend/edge function that looks at trends over the last 24h
// instead of just the current snapshot.
export const generateTipOfTheDay = (stats: LiveStats): string => {
  if (stats.batteryTempC >= 45) {
    return 'Battery is running hot today. Keep AdlaWatt in a shaded, ventilated spot.';
  }
  if (stats.batteryPercent <= 20) {
    return 'Battery is low. Place the solar panel under direct sunlight to recharge faster.';
  }
  if (!stats.isSunny) {
    return "It's cloudy today, so charging may be slower than usual. Plan your usage accordingly.";
  }
  if (stats.loadNowWatts > stats.solarInputWatts) {
    return 'Current usage is higher than solar input right now. The battery will discharge until sunlight improves.';
  }
  return 'Solar input looks healthy today. Great time to charge your connected devices.';
};
