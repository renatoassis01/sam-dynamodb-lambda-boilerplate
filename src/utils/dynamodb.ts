import * as AWS from 'aws-sdk';
import { getEndpointDynamo } from './environment';
AWS.config.update({
  apiVersion: '2012-08-10',
  region: 'us-east-1',
});

export type ItemList = AWS.DynamoDB.DocumentClient.ItemList | undefined;

export const dynamoClient = new AWS.DynamoDB.DocumentClient({
  endpoint: getEndpointDynamo(),
});

export const queryDynamodb = async (
  tableName: string,
  queryparams: Record<string, unknown>,
  index?: string,
): Promise<ItemList> => {
  const keyConditions: string[] = [];
  const expressionAttributeValues: Record<string, unknown> = {};
  Object.keys(queryparams).forEach((key) => {
    expressionAttributeValues[`:${key}`] = queryparams[key];
    keyConditions.push(`${key} = :${key}`);
  });

  const params = {
    TableName: tableName,
    IndexName: index,
    KeyConditionExpression: keyConditions.join(' and '),
    ExpressionAttributeValues: expressionAttributeValues,
  };

  const response = await dynamoClient.query(params).promise();
  console.log(response);
  return response.Items;
};
