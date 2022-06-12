import { DateTime } from 'luxon';

export function formatDate(date: string) {
  return DateTime.fromISO(date).toLocaleString(DateTime.DATE_MED);
}
