import {updateSheet} from './src/updateSheet.ts';
import {getClientInfo} from './src/getClientInfo.ts';
import {getStatements} from './src/getStatements.ts';
import {getUnixTimeOfMonth} from './src/getUnixTimeOfMonth.ts';
import {statementsToColumns} from './src/statementsToColumns.ts';

const account = await getClientInfo().then(info => info.accounts.find(({type}) => type === 'platinum')?.id);

if (!account) {
  throw new Error('Account not found');
}

const {from} = getUnixTimeOfMonth({
  monthName: 'December',
  timezone: 'Europe/Kiev',
  year: 2023,
});

const statements = await getStatements({
  account,
  from,
});

await updateSheet({
  spreadsheetId: '1TcpjYSMU6_AegrKyCfYJvcuTcWdzEKT1dHpgScGEo2Q',
  range: 'Dec2023!A1',
  values: statementsToColumns(statements),
});
