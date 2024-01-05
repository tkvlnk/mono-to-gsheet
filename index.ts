import { google } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth';
import { resolve } from 'path';

const auth = await authenticate({
  keyfilePath: resolve(process.cwd(), './client-secret.json'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheetId = '1TcpjYSMU6_AegrKyCfYJvcuTcWdzEKT1dHpgScGEo2Q';
const range = 'Dec2023!A1';

const sheets = google.sheets({ version: 'v4', auth });

try {
  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range: range,
    valueInputOption: 'RAW',
    requestBody: {
      values: [['EVEN MORE New Data!!!!!!111234455']],
    },
  });

  console.log('Cell updated successfully!');
} catch (error) {
  console.error('The API returned an error:', (error as Error).message)
}
