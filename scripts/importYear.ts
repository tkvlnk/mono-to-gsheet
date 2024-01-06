import { createTab } from "../src/createTab.ts";
import { getAccountByType } from "../src/getAccountByType.ts";
import { getStatements } from "../src/getStatements.ts";
import { getUnixTimeOfMonth } from "../src/getUnixTimeOfMonth.ts";
import { monthNames } from "../src/monthNames.ts";
import { statementsToColumns } from "../src/statementsToColumns.ts";
import { updateSheet } from "../src/updateSheet.ts";
import { load as loadEnv } from "deno-std/dotenv/mod.ts";

const {
  YEAR: ENV_YEAR,
  SPREADSHEET_ID: spreadsheetId,
} = await loadEnv();

const year = ENV_YEAR ? parseInt(ENV_YEAR, 10) : new Date().getFullYear() - 1;

if (!spreadsheetId) {
  throw new Error("SPREADSHEET_ID must be set in .env file");
}

console.log(`Started for Year - ${year}`);

const account = await getAccountByType("platinum");

for (const monthName of monthNames) {
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
    account,
  });

  console.log(
    `Loaded statements for Month - ${monthName} (statements.length - ${statements.length})`,
  );

  await updateSheet({
    spreadsheetId,
    range: `${tabName}!A1`,
    values: statementsToColumns(statements),
  });

  console.log(`Uploaded statements for Month - ${monthName}`);

  if (monthName !== monthNames[monthNames.length - 1]) {
    await new Promise((resolve) => {
      setTimeout(resolve, 60_000);
    });
  }
}

console.log(`Finished for Year - ${year}`);
