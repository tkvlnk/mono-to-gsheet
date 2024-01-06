import {googleSheetsApi} from './googleSheetsApi.ts';

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
    await googleSheetsApi.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    console.log('Cell updated successfully!');
  } catch (error) {
    console.error('The API returned an error:', (error as Error).message);
  }
}
