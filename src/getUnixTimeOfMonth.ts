import utcToZonedTime from 'date-fns-tz/utcToZonedTime';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'] as const;

export function getUnixTimeOfMonth({
  monthName,
  timezone = 'Z',
  year = new Date().getFullYear(),
}: {
  monthName: (typeof monthNames)[number];
  timezone?: string;
  year?: number;
}) {
  const monthNumber = getMonthNumber(monthName);

  return {
    from: getUnixTimeStartOfMonth({monthNumber, year, timezone}),
    to: getUnixTimeEndOfMonth({monthNumber, year, timezone}),
  };
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
  const dateString = `${year}-${monthNumber}-01T00:00:00Z`;
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
  const dateString = `${year}-${monthNumber === 12 ? 1 : monthNumber + 1}-01T00:00:00Z`;
  const date = utcToZonedTime(new Date(dateString), timezone);
  date.setSeconds(date.getSeconds() - 1);
  return Math.floor(date.getTime() / 1000);
}

function getMonthNumber(monthName: (typeof monthNames)[number]) {
  const monthNumber = monthNames.indexOf(monthName) + 1;

  if (monthNumber < 1 || monthNumber > 12) {
    throw new Error(`Invalid month name: ${monthName}`);
  }

  return monthNumber;
}
