import * as dotenv from 'dotenv';
dotenv.config();

export const getEndpointDynamo = (): string => {
  return process.env.DYNAMODB_ENDPOINT!;
};

export const getTableDynamo = (): string => {
  return process.env.DYNAMODB_TABLE!;
};

export const getRegion = (): string => {
  return process.env.REGION!;
};
