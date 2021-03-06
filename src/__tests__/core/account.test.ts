import { graphql, GraphQLSchema } from 'graphql';
import { testSchema } from '../utils';

let schema = testSchema();

test('account: select by address', async () => {
  const query = `
    {
      account(address: "0x0000000000000000000000000000000000000000") {
        code
        transactionCount
      }
    }
  `;

  const expected = { data: { account: { code: '0x', transactionCount: 0 } } };

  const result = await graphql(schema, query);
  expect(result).toEqual(expected);
});

test('account: error when address is invalid', async () => {
  const query = `
    {
      account(address: "0x1234") {
        code
        transactionCount
      }
    }
  `;

  const result = await graphql(schema, query);
  expect(result.errors).toHaveLength(1);
  expect(result.errors[0].message).toMatch(/^Expected type Address\!/);
});
