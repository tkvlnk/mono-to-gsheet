import {updateSheet} from './src/updateSheet.ts';

await updateSheet({
  spreadsheetId: '1TcpjYSMU6_AegrKyCfYJvcuTcWdzEKT1dHpgScGEo2Q',
  range: 'Dec2023!A1',
  values: [['EVEN MORE New Data!!!!!!111234455']],
});
