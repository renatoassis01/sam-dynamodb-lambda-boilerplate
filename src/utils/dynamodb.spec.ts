import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { dynamoClient, queryDynamodb } from './dynamodb';
describe('Suite test for dynamodb', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('SMOKE TEST', () => {
    expect(dynamoClient).toBeInstanceOf(DocumentClient);
  });

  it('tests for  queryDynamodb', async () => {
    const params = {
      TableName: 'ItemTable',
      IndexName: 'indexName',
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: { ':id': 'tw1rmWhwtcUtaVa/' },
    };

    const queryParams = { id: 'tw1rmWhwtcUtaVa/' };
    await queryDynamodb('ItemTable', queryParams, 'indexName');
    const querySpy = jest.spyOn(dynamoClient.query.prototype, 'query');

    querySpy.mockReturnValue(<any>{
      promise: () => Promise.resolve(<any>'items'),
    });

    expect(querySpy).toBeCalledWith(params);
    querySpy.mockRestore();
  });
});
