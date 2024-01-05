import {createTab} from '../src/createTab.ts';
import {getAccountByType} from '../src/getAccountByType.ts';
import {getStatements} from '../src/getStatements.ts';
import {getUnixTimeOfMonth} from '../src/getUnixTimeOfMonth.ts';
import {getMonthName} from '../src/monthNames.ts';
import {statementsToColumns} from '../src/statementsToColumns.ts';
import {updateSheet} from '../src/updateSheet.ts';
import {type MonthName} from './../src/monthNames.ts';

const year = process.env.YEAR ? parseInt(process.env.YEAR, 10) : new Date().getFullYear();
const monthName = (process.env.MONTH_NAME as MonthName) ?? getMonthName({number: new Date().getMonth() + 1});

const tabName = `${monthName}-${year}`;

try {
  await createTab({
    title: tabName,
    spreadsheetId: process.env.SPREADSHEET_ID!,
  });
} catch (error) {
  console.warn(`Tab creation error: ${(error as Error).message}`);
}

const statements = await getStatements({
  ...getUnixTimeOfMonth({monthName, year, timezone: 'Europe/Kiev'}),
  account: await getAccountByType('platinum'),
});

await updateSheet({
  spreadsheetId: process.env.SPREADSHEET_ID!,
  range: `${tabName}!A1`,
  values: statementsToColumns(statements),
});
