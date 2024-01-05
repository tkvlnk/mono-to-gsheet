import { google } from 'googleapis';
import { authenticate } from '@google-cloud/local-auth';
import { resolve } from 'path';

const auth = await authenticate({
  keyfilePath: resolve(process.cwd(), './client-secret.json'), // Path to your OAuth credentials file
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// const auth = 'AIzaSyCxXpmfiiTYHlCPaHTg2WB0g4LbKFD4f-Y';

const sheetId = '1TcpjYSMU6_AegrKyCfYJvcuTcWdzEKT1dHpgScGEo2Q';
const range = 'Dec2023!A1'; // Update the sheet and cell as needed

const sheets = google.sheets({ version: 'v4', auth });

// Update the cell with new data
sheets.spreadsheets.values.update({
  spreadsheetId: sheetId,
  range: range,
  valueInputOption: 'RAW',
  requestBody: {
    values: [['EVEN MORE New Data!!!!!!111234455']],
  },
}, (err, res) => {
  if (err) return console.error('The API returned an error:', err.message);
  console.log('Cell updated successfully!');
});
