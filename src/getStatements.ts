import { load as loadEnv } from "deno-std/dotenv/mod.ts";

export type Statement = {
  id: string;
  time: number;
  description: string;
  mcc: number;
  originalMcc: number;
  hold: boolean;
  amount: number;
  operationAmount: number;
  currencyCode: number;
  commissionRate: number;
  cashbackAmount: number;
  balance: number;
  comment: string;
  receiptId: string;
  invoiceId: string;
  counterEdrpou: string;
  counterIban: string;
  counterName: string;
};

export async function getStatements({
  account,
  from,
  to,
}: {
  account: string;
  from: number;
  to?: number;
}) {
  const {
    MONOBANK_TOKEN,
  } = await loadEnv();

  if (!MONOBANK_TOKEN) {
    throw new Error("MONOBANK_TOKEN is not set");
  }

  const response = await fetch(
    `https://api.monobank.ua/personal/statement/${account}/${from}${
      to ? `/${to}` : ""
    }}`,
    {
      headers: {
        "X-Token": MONOBANK_TOKEN,
      },
    },
  );

  return response.json() as Promise<Statement[]>;
}
