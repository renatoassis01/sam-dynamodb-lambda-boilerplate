import { APIGatewayProxyEvent, Callback } from "aws-lambda";
import { Context } from "vm";
import {
  HttpMethods,
  HttpStatusCode,
  MethodNotAllowedException,
} from "../utils/http";
import { dynamoClient } from "../utils/dynamodb";
import { buildResponse } from "../utils/builders";

export const postItem = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback
): Promise<void> => {
  try {
    if (event.httpMethod !== HttpMethods.POST) {
      throw new MethodNotAllowedException(event.httpMethod, HttpMethods.GET);
    }

    const body = JSON.parse(event.body);
    const name = body.name;

    var params = {
      TableName: tableName,
      Item: {
        id: new Date().getTime().toString(),
        name: `${name}-${new Date().getTime().toString()}`,
        created_at: new Date().toISOString(),
      },
    };
    await dynamoClient.put(params).promise();
    callback(null, buildResponse(HttpStatusCode.OK));
  } catch (err) {
    if (err.statusCode)
      callback(null, buildResponse(err.statusCode, err.message));
  }
};
