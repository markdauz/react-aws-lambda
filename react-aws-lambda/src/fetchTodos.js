const AWS = require('aws-sdk');

const fetchTodos = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  let todos;

  try {
    const results = await dynamodb
      .scan({
        TableName: 'TodoTable',
      })
      .promise();
    todos = results.Items;
  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(todos),
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
    },
  };
};

module.exports = {
  handler: fetchTodos,
};
