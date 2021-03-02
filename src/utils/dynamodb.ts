import * as AWS from 'aws-sdk';
import { Endpoint } from 'aws-sdk';
import * as dotenv from 'dotenv';
import { getEndpointDynamo, getRegion } from './environment';

dotenv.config();

export type ItemList = AWS.DynamoDB.DocumentClient.ItemList | undefined;

export const dynamoClient = new AWS.DynamoDB.DocumentClient({
  endpoint: getEndpointDynamo(),
  apiVersion: '2012-08-10',
  region: getRegion(),
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
  return response.Items;
};
