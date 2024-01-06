// @deno-types='npm:@types/luxon'
import { DateTime } from "luxon";
import { getMonthNumber, type MonthName } from "./monthNames.ts";

export function getUnixTimeOfMonth({
  monthName,
  monthNumber,
  timezone = "UTC",
  year = new Date().getFullYear(),
}: {
  monthNumber?: number;
  monthName?: MonthName;
  timezone?: string;
  year?: number;
}) {
  if (!monthNumber && !monthName) {
    throw new Error("Month number or name is required");
  }

  monthNumber ??= getMonthNumber(monthName);

  const from = DateTime.fromObject({
    year,
    month: monthNumber,
    day: 1,
  }, {
    zone: timezone,
  }).toSeconds();
  const to = DateTime.fromObject({
    year,
    month: monthNumber,
    day: 1,
  }, {
    zone: timezone,
  })
    .plus({
      months: 1,
    })
    .minus({
      seconds: 1,
    })
    .toSeconds();

  return to <= Math.floor(Date.now() / 100) ? { from, to } : { from };
}
