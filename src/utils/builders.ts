import { APIGatewayProxyResult } from "aws-lambda";
import { HttpStatusCode } from "./http";

export const buildResponse = (
  statusCode: HttpStatusCode,
  body?: unknown
): APIGatewayProxyResult => {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(body),
  };
};
