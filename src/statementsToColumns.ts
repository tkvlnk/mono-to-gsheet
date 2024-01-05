import formatDate from 'date-fns-tz/format';
import type {Statement} from './getStatements.ts';

const columnsOrder = [
  'id',
  'time',
  'description',
  'mcc',
  'originalMcc',
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
  'hold',
] satisfies Array<keyof Statement>;

export function statementsToColumns(statements: Statement[]): string[][] {
  const columns: string[][] = [columnsOrder];

  for (const statement of statements) {
    const row: string[] = [];

    for (const column of columnsOrder) {
      switch (column) {
        case 'time': {
          row.push(
            formatDate(statement[column] * 1000, 'yyyy-MM-dd HH:mm:ss', {
              timeZone: 'Europe/Kiev',
            }),
          );

          continue;
        }

        case 'amount':
        case 'operationAmount': {
          row.push((statement[column] / 100).toFixed(2).replace('.', ','));

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
