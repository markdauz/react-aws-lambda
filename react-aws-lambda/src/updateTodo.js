const AWS = require('aws-sdk');

const updateTodo = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { todo } = JSON.parse(event.body);
  const { id } = event.pathParameters;

  console.log(id);

  await dynamodb
    .update({
      TableName: 'TodoTable',
      Key: { id },
      UpdateExpression: 'set todo = :todo',
      ExpressionAttributeValues: {
        ':todo': todo,
      },
      ReturnValues: 'ALL_NEW',
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify({ msg: 'Todo Updated' }),
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT',
    },
  };
};

module.exports = {
  handler: updateTodo,
};
