import { getTableDynamo } from "../utils/environment";
import { dynamoClient } from "../utils/dynamodb";

import { APIGatewayProxyEvent, Callback, Context } from "aws-lambda";
import { buildResponse } from "../utils/builders";
import {
  HttpMethods,
  HttpStatusCode,
  MethodNotAllowedException,
} from "../utils/http";

export const getById = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback
): Promise<void> => {
  try {
    if (event.httpMethod !== HttpMethods.GET) {
      throw new MethodNotAllowedException(event.httpMethod, HttpMethods.GET);
    }

    // Get id from pathParameters from APIGateway because of `/{id}` at template.yml
    const id = event.pathParameters;

    const params = {
      TableName: getTableDynamo(),
      Key: { id: id },
    };
    const data = await dynamoClient.get(params).promise();
    const item = data.Item;
    callback(null, buildResponse(HttpStatusCode.OK, item));
  } catch (err) {
    if (err.statusCode)
      callback(null, buildResponse(err.statusCode, err.message));
  }
};
