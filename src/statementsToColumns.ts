import type {Statement} from './getStatements.ts';

const columnsOrder = [
  'id',
  'time',
  'description',
  'mcc',
  'originalMcc',
  'hold',
  'amount',
  'operationAmount',
  'currencyCode',
  'commissionRate',
  'cashbackAmount',
  'balance',
  'comment',
  'receiptId',
  'invoiceId',
  'counterEdrpou',
  'counterIban',
  'counterName',
] satisfies Array<keyof Statement>;

export function statementsToColumns(statements: Statement[]): string[][] {
  const columns: string[][] = [columnsOrder];

  for (const statement of statements) {
    const row: string[] = [];

    for (const column of columnsOrder) {
      switch (column) {
        case 'time': {
          const date = new Date(statement[column] * 1000);

          row.push(
            date.toISOString(),
          );

          continue;
        }

        default: {
          row.push((statement[column] ?? '').toString());

          break;
        }
      }
    }

    columns.push(row);
  }

  return columns;
}
