import {getClientInfo} from './getClientInfo.ts';

export async function getAccountByType(type: string) {
  const info = await getClientInfo();
  const account = info.accounts.find(acc => acc.type === type)?.id;

  if (!account) {
    throw new Error('Account not found');
  }

  return account;
}
