export const getEndpointDynamo = (): string => {
  return process.env.DYNAMODB_ENDPOINT!;
};

export const getTableDynamo = (): string => {
  return process.env.DYNAMODB_TABLE!;
};
