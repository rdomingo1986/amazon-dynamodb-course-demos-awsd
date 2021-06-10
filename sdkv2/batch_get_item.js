require('dotenv').config();

var AWS = require('aws-sdk');
var util = require('util');

var dynamodb = new AWS.DynamoDB({
  accessKeyId: process.env.API_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.region
});

dynamodb.batchGetItem({
  RequestItems: {
    'Books': {
      Keys: [
        {
          'Author': {
            S: 'Dr. Seuss'
          },
          'Title': {
            S: 'Green Eggs and Ham'
          }
        },
        {
          'Author': {
            S: 'James Patterson'
          },
          'Title': {
            S: 'Along Came a Spider'
          }
        }
      ]
    }
  }
}, function (err, response) {
  if (err) return console.log(err);
  console.log(util.inspect(response, false, null, true));
});