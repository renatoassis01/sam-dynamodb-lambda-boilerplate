import { APIGatewayProxyEvent, Callback } from 'aws-lambda';
import { Context } from 'vm';
import {
  HttpMethods,
  HttpStatusCode,
  MethodNotAllowedException,
} from '../utils/http';
import { dynamoClient } from '../utils/dynamodb';
import { buildResponse } from '../utils/builders';
import {
  validatorBody,
  validatorName,
  validatorUserId,
} from '../utils/validators';
import { getTableDynamo } from '../utils/environment';

export const postItem = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback,
): Promise<void> => {
  try {
    if (event.httpMethod !== HttpMethods.POST) {
      throw new MethodNotAllowedException(event.httpMethod, HttpMethods.GET);
    }

    validatorBody(event.body!);
    const body = JSON.parse(event.body!);
    const name = validatorName(body.name);
    const userId = validatorUserId(body.user_id);

    const params = {
      TableName: getTableDynamo(),
      Item: {
        id: new Date().getTime().toString(),
        name,
        user_id: userId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        enable: true,
      },
    };
    await dynamoClient.put(params).promise();
    callback(null, buildResponse(HttpStatusCode.OK, 'item inserted'));
  } catch (err) {
    if (err.statusCode)
      callback(null, buildResponse(err.statusCode, err.message));
    callback(null, buildResponse(HttpStatusCode.BAD_REQUEST, err.message));
  }
};
