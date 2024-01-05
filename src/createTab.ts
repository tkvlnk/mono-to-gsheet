import {googleSheetsApi} from './googleSheetsApi.ts';

export async function createTab({
  spreadsheetId,
  title,
}: {
  spreadsheetId: string;
  title: string;
}) {
  try {
    await googleSheetsApi.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: {
                title,
              },
            },
          },
        ],
      },
    });

    console.log('Tab created successfully!');
  } catch (error) {
    console.error('The API returned an error:', (error as Error).message);
  }
}
