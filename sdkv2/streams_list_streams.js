require('dotenv').config();

var AWS = require('aws-sdk');

var dynamoStreams = new AWS.DynamoDBStreams({
  accessKeyId: process.env.API_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION
});

dynamoStreams.listStreams({
  TableName: 'Books'
}, function (err, response) {
  if (err) return console.log(err);
  console.log(response);
});