export type Account = {
  id: string;
  sendId: string;
  balance: number;
  creditLimit: number;
  type: string;
  currencyCode: number;
  cashbackType: string;
  maskedPan: string[];
  iban: string;
};

export type Jar = {
  id: string;
  sendId: string;
  title: string;
  description: string;
  currencyCode: number;
  balance: number;
  goal: number;
};

export type ClientInfo = {
  clientId: string;
  name: string;
  webHookUrl: string;
  permissions: string;
  accounts: Account[];
  jars: Jar[];
};

export async function getClientInfo() {
  if (!process.env.MONOBANK_TOKEN) {
    throw new Error('MONOBANK_TOKEN is not set');
  }

  const response = await fetch(
    'https://api.monobank.ua/personal/client-info',
    {
      headers: {
        'X-Token': process.env.MONOBANK_TOKEN,
      },
    },
  );

  return response.json() as Promise<ClientInfo>;
}
