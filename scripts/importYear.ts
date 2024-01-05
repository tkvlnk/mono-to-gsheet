import {ca} from 'date-fns/locale';
import {createTab} from '../src/createTab.ts';
import {getAccountByType} from '../src/getAccountByType.ts';
import {getStatements} from '../src/getStatements.ts';
import {getUnixTimeOfMonth} from '../src/getUnixTimeOfMonth.ts';
import {monthNames} from '../src/monthNames.ts';
import {statementsToColumns} from '../src/statementsToColumns.ts';
import {updateSheet} from '../src/updateSheet.ts';

const year = process.env.YEAR ? parseInt(process.env.YEAR, 10) : new Date().getFullYear() - 1;

console.log(`Started for Year - ${year}`);

const account = await getAccountByType('platinum');

/* eslint-disable no-await-in-loop */
for (const monthName of monthNames) {
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
    account,
  });

  console.log(`Loaded statements for Month - ${monthName} (statements.length - ${statements.length})`);

  await updateSheet({
    spreadsheetId: process.env.SPREADSHEET_ID!,
    range: `${tabName}!A1`,
    values: statementsToColumns(statements),
  });

  console.log(`Uploaded statements for Month - ${monthName}`);

  if (monthName !== monthNames[monthNames.length - 1]) {
    await new Promise(resolve => {
      setTimeout(resolve, 60_000);
    });
  }
}
/* eslint-enable no-await-in-loop */

console.log(`Finished for Year - ${year}`);
