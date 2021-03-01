export const getEndpointDynamo = (): string => {
  return process.env.DYNAMODB_ENDPOINT || 'http://dynamodb:8000';
};

export const getTableDynamo = (): string => {
  return process.env.DYNAMODB_TABLE!;
};
