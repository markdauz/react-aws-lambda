const { v4 } = require('uuid');
const AWS = require('aws-sdk');

const addTodo = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { todo } = JSON.parse(event.body);
  const createdAt = new Date();
  const id = v4();

  const newTodo = {
    id,
    todo,
    createdAt,
    completed: false,
  };

  await dynamodb
    .put({
      TableName: 'TodoTable',
      Item: newTodo,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(newTodo),
    headers: {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,DELETE',
      'Content-Type': 'application/json',
    },
  };
};

module.exports = {
  handler: addTodo,
};
