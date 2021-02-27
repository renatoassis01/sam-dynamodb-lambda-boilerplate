import { getTableDynamo } from "../utils/environment";
import { dynamoClient } from "../utils/dynamodb";

import { APIGatewayProxyEvent, Callback, Context } from "aws-lambda";
import { buildResponse } from "../utils/builders";
import {
  HttpMethods,
  HttpStatusCode,
  InternalServerErrorException,
  MethodNotAllowedException,
} from "../utils/http";

export const updateById = async (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback
): Promise<void> => {
  try {
    if (event.httpMethod !== HttpMethods.PUT) {
      throw new MethodNotAllowedException(event.httpMethod, HttpMethods.PUT);
    }

    // Get id from pathParameters from APIGateway because of `/{id}` at template.yml
    const id = event.pathParameters;

    const params = {
      TableName: getTableDynamo(),
      Key: { id: id },
    };
    await dynamoClient.update(params).promise();
    callback(
      null,
      buildResponse(HttpStatusCode.OK, {
        message: "updated successfully.",
      })
    );
  } catch (err) {
    if (err.code === "ConditionalCheckFailedException")
      callback(null, buildResponse(HttpStatusCode.BAD_REQUEST, "Id invalid"));
    else if (err.statusCode)
      callback(null, buildResponse(err.statusCode, err.message));
    throw new InternalServerErrorException();
  }
};
