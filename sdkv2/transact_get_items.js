require('dotenv').config();

var AWS = require('aws-sdk');
var util = require('util');

var dynamodb = new AWS.DynamoDB({
  accessKeyId: process.env.API_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION
});

dynamodb.transactGetItems({
  TransactItems: [
    {
      Get: {
        TableName: 'Books',
        Key: {
          'Author': {
            S: 'John Grisham'
          },
          'Title': {
            S: 'The Rainmaker'
          }
        }
      }
    },
    {
      Get: {
        TableName: 'Books',
        Key: {
          'Author': {
            S: 'Dr. Seuss'
          },
          'Title': {
            S: 'Green Eggs and Ham'
          }
        }
      }
    }
  ]
}, function (err, response) {
  if (err) return console.log(err);
  console.log(util.inspect(response, false, null, true));
});