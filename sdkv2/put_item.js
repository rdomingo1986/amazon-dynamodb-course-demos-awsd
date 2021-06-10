require('dotenv').config();

var AWS = require('aws-sdk');

var dynamodb = new AWS.DynamoDB({
  accessKeyId: process.env.API_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION
});

dynamodb.putItem({
  TableName: 'Books',
  Item: {
    'Author': {
      S: 'John Grisham'
    },
    'Title': {
      S: 'The Rainmaker'
    },
    'Category': {
      S: 'Suspense'
    },
    'Formats': {
      M: {
        'Hardcover': {
          S: 'J4SUKVGU'
        },
        'Paperback': {
          S: 'D7YF4FCX'
        }
      }
    }
  }
}, function (err, response) {
  if (err) return console.log(err);
  console.log(response);
});