import { createTab } from "../src/createTab.ts";
import { getAccountByType } from "../src/getAccountByType.ts";
import { getStatements } from "../src/getStatements.ts";
import { getUnixTimeOfMonth } from "../src/getUnixTimeOfMonth.ts";
import { getMonthName } from "../src/monthNames.ts";
import { statementsToColumns } from "../src/statementsToColumns.ts";
import { updateSheet } from "../src/updateSheet.ts";
import { type MonthName } from "./../src/monthNames.ts";
import { load as loadEnv } from "deno-std/dotenv/mod.ts";

const {
  YEAR,
  SPREADSHEET_ID: spreadsheetId,
  MONTH_NAME,
} = await loadEnv();

const year = YEAR ? parseInt(YEAR, 10) : new Date().getFullYear() - 1;

const monthName = (MONTH_NAME as MonthName) ??
  getMonthName({ number: new Date().getMonth() + 1 });

if (!spreadsheetId) {
  throw new Error("SPREADSHEET_ID must be set in .env file");
}

const tabName = `${monthName}-${year}`;

try {
  await createTab({
    title: tabName,
    spreadsheetId,
  });
} catch (error) {
  console.warn(`Tab creation error: ${(error as Error).message}`);
}

const statements = await getStatements({
  ...getUnixTimeOfMonth({ monthName, year, timezone: "Europe/Kyiv" }),
  account: await getAccountByType("platinum"),
});

await updateSheet({
  spreadsheetId,
  range: `${tabName}!A1`,
  values: statementsToColumns(statements),
});
