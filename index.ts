import {updateSheet} from './src/updateSheet.ts';
import {getStatements} from './src/getStatements.ts';
import {getUnixTimeOfMonth} from './src/getUnixTimeOfMonth.ts';
import {statementsToColumns} from './src/statementsToColumns.ts';
import {getAccountByType} from './src/getAccountByType.ts';

const {from} = getUnixTimeOfMonth({
  monthName: 'DEC',
  timezone: 'Europe/Kiev',
  year: 2023,
});

const statements = await getStatements({
  account: await getAccountByType('platinum'),
  from,
});

await updateSheet({
  spreadsheetId: '1TcpjYSMU6_AegrKyCfYJvcuTcWdzEKT1dHpgScGEo2Q',
  range: 'Dec2023!A1',
  values: statementsToColumns(statements),
});
