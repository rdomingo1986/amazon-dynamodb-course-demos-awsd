require('dotenv').config();

var AWS = require('aws-sdk');
var util = require('util');

var dynamoStreams = new AWS.DynamoDBStreams({
  accessKeyId: process.env.API_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION
});

dynamoStreams.getRecords({
  ShardIterator: process.argv[2]
}, function (err, response) {
  if (err) return console.log(err);
  console.log(util.inspect(response, false, null, true));
});