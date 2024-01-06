
export const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'] as const;

export type MonthName = (typeof monthNames)[number];

export function getMonthName({
  number,
  index,
}: {index?: number; number?: number}): MonthName {
  if (!number && !index) {
    throw new Error('Month number or index is required');
  }

  index ??= number! - 1;

  return monthNames[index];
}

export function getMonthNumber(monthName?: MonthName) {
  if (!monthName) {
    throw new Error('Month name is required');
  }

  const monthNumber = monthNames.indexOf(monthName) + 1;

  if (monthNumber < 1 || monthNumber > 12) {
    throw new Error(`Invalid month name: ${monthName}`);
  }

  return monthNumber;
}
