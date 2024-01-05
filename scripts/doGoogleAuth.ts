import {authenticate} from '@google-cloud/local-auth';
import {resolve} from 'path';
import {writeFile} from 'fs/promises';

try {
  const auth = authenticate({
    keyfilePath: resolve(process.cwd(), './secrets/client-secret.json'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const {credentials} = await auth;

  await writeFile(
    resolve(process.cwd(), './secrets/credentials.json'),
    JSON.stringify(credentials),
  );
} catch (error) {
  console.error('Google auth faile due to error:', (error as Error).message);
}

