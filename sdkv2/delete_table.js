require('dotenv').config();

var AWS = require('aws-sdk');

var dynamodb = new AWS.DynamoDB({
  accessKeyId: process.env.API_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.argv[2] === undefined ? process.env.REGION : process.argv[2]
});

dynamodb.deleteTable({
  TableName: 'Books'
}, function (err, response) {
  if (err) return console.log(err);
  console.log(response);
});