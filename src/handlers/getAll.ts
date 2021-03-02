import { APIGatewayProxyEvent, Callback, Context } from 'aws-lambda';
import { buildResponse } from '../utils/builders';
import { dynamoClient } from '../utils/dynamodb';
import { getTableDynamo } from '../utils/environment';
import { HttpStatusCode, InternalServerErrorException } from '../utils/http';

export const getAll = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback,
): Promise<void> => {
  try {
    const params = {
      TableName: getTableDynamo(),
    };
    const data = await dynamoClient.scan(params).promise();
    const items = data.Items;
    callback(null, buildResponse(HttpStatusCode.OK, items));
  } catch (err) {
    if (err.statusCode)
      callback(null, buildResponse(err.statusCode, err.message));
    throw new InternalServerErrorException();
  }
};
