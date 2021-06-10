require('dotenv').config();

var AWS = require('aws-sdk');
var util = require('util');

var dynamodb = new AWS.DynamoDB({
  accessKeyId: process.env.API_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION
});

dynamodb.scan({
  TableName: 'Books',
  ProjectionExpression: process.argv[3], //"Author, Title, Category, Formats"
  ExpressionAttributeValues: {
    ":category_name": {
      S: process.argv[2]
    }
  },
  FilterExpression: "Category = :category_name"
}, function (err, response) {
  if (err) return console.log(err);
  console.log(util.inspect(response, false, null, true));
});