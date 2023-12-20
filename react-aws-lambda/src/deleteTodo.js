const AWS = require('aws-sdk');

const deleteTodo = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  await dynamodb
    .delete({
      TableName: 'TodoTable',
      Key: { id },
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({}),
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
    },
  };
};

module.exports = {
  handler: deleteTodo,
};
