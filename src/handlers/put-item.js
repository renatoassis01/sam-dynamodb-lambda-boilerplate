const aws = require("aws-sdk");
aws.config.update({
  region: "us-west-1",
  endpoint: "http://dynamodb:8000",
});

var docClient = new aws.DynamoDB.DocumentClient();

const tableName = process.env.SAMPLE_TABLE;
console.log(tableName);

exports.putItemHandler = async (event) => {
  if (event.httpMethod !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.httpMethod} method.`
    );
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

  await docClient.put(params).promise();
  const response = {
    statusCode: 200,
  };

  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
