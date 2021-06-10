require('dotenv').config();

var AWS = require('aws-sdk');
var util = require('util');

var dynamodb = new AWS.DynamoDB({
  accessKeyId: process.env.API_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION
});

dynamodb.query({
  TableName: 'Books',
  ProjectionExpression: process.argv[3], //"Author, Title, Category, Formats",
  KeyConditionExpression:'Author = :author_name',
  ExpressionAttributeValues: {
    ':author_name': {
      S: process.argv[2]
    }
  },
  Limit: process.argv[4],
  ScanIndexForward: true // default (asc)
}, function (err, response) {
  if (err) return console.log(err);
  console.log(util.inspect(response, false, null, true));
});
