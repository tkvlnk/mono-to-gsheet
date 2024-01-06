import { load as loadEnv } from "deno-std/dotenv/mod.ts";

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
  const {
    MONOBANK_TOKEN,
  } = await loadEnv();

  if (!MONOBANK_TOKEN) {
    throw new Error("MONOBANK_TOKEN is not set");
  }

  const response = await fetch(
    "https://api.monobank.ua/personal/client-info",
    {
      headers: {
        "X-Token": MONOBANK_TOKEN,
      },
    },
  );

  return response.json() as Promise<ClientInfo>;
}
