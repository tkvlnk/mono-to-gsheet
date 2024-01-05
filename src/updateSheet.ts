import {google} from 'googleapis';
import {authenticate} from '@google-cloud/local-auth';
import {resolve} from 'path';

const sheets = authenticate({
  keyfilePath: resolve(process.cwd(), './client-secret.json'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
}).then(auth => google.sheets({version: 'v4', auth}));

export async function updateSheet({
  spreadsheetId,
  range,
  values,
}: {
  spreadsheetId: string;
  range: string;
  values: string[][];
}) {
  try {
    await (await sheets).spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values,
      },
    });

    console.log('Cell updated successfully!');
  } catch (error) {
    console.error('The API returned an error:', (error as Error).message);
  }
}
