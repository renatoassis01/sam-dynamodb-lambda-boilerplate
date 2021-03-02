import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { dynamoClient } from '../../utils/dynamodb';

describe('Suite test for dynamodb', () => {
  it('SMOKE TEST', () => {
    expect(dynamoClient).toBeInstanceOf(DocumentClient);
  });
});
