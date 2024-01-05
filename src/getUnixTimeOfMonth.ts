import utcToZonedTime from 'date-fns-tz/utcToZonedTime';
import {type MonthName, getMonthNumber} from './monthNames.ts';

export function getUnixTimeOfMonth({
  monthName,
  monthNumber,
  timezone = 'UTC',
  year = new Date().getFullYear(),
}: {
  monthNumber?: number;
  monthName?: MonthName;
  timezone?: string;
  year?: number;
}) {
  if (!monthNumber && !monthName) {
    throw new Error('Month number or name is required');
  }

  monthNumber ??= getMonthNumber(monthName);

  const from = getUnixTimeStartOfMonth({monthNumber, year, timezone});
  const to = getUnixTimeEndOfMonth({monthNumber, year, timezone});

  return to <= Math.floor(Date.now() / 100) ? {from, to} : {from};
}

function getUnixTimeStartOfMonth({
  monthNumber,
  year,
  timezone,
}: {
  monthNumber: number;
  year: number;
  timezone: string;
}) {
  const dateString = `${year}-${String(monthNumber).padStart(2, '0')}-01T00:00:00Z`;
  const date = utcToZonedTime(new Date(dateString), timezone);

  return Math.floor(date.getTime() / 1000);
}

function getUnixTimeEndOfMonth({
  monthNumber,
  year,
  timezone,
}: {
  monthNumber: number;
  year: number;
  timezone: string;
}) {
  const yearString = monthNumber === 12 ? year + 1 : year;
  const monthString = String(monthNumber === 12 ? 1 : monthNumber + 1).padStart(2, '0');
  const dateString = `${yearString}-${monthString}-01T00:00:00Z`;
  const date = utcToZonedTime(new Date(dateString), timezone);
  date.setSeconds(date.getSeconds() - 1);
  return Math.floor(date.getTime() / 1000);
}
