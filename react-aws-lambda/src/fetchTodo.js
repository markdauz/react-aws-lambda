const AWS = require('aws-sdk');

const fetchTodo = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  let todo;

  try {
    const result = await dynamodb
      .get({
        TableName: 'TodoTable',
        Key: { id },
      })
      .promise();
    todo = result.Item;
  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(todo),
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
    },
  };
};

module.exports = {
  handler: fetchTodo,
};
