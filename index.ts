// Import {updateSheet} from './src/updateSheet.ts';

import {getClientInfo} from './src/getClientInfo.ts';
import {getStatements} from './src/getStatements.ts';
import {getUnixTimeOfMonth} from './src/getUnixTimeOfMonth.ts';

// Await updateSheet({
//   spreadsheetId: '1TcpjYSMU6_AegrKyCfYJvcuTcWdzEKT1dHpgScGEo2Q',
//   range: 'Dec2023!A1',
//   values: [['EVEN MORE New Data!!!!!!111234455']],
// });

const account = await getClientInfo().then(info => info.accounts.find(({type}) => type === 'platinum')?.id);

if (!account) {
  throw new Error('Account not found');
}

const {from} = getUnixTimeOfMonth({
  monthName: 'December',
  timezone: 'Europe/Kiev',
  year: 2023,
});

console.log(from);

console.log(await getStatements({
  account,
  from,
}));
