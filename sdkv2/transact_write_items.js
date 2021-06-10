require('dotenv').config();

var AWS = require('aws-sdk');

var dynamodb = new AWS.DynamoDB({
  accessKeyId: process.env.API_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION
});

dynamodb.transactWriteItems({
  TransactItems: [
    {
      Delete: {
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
      Put: {
        'TableName': 'Books',
        Item: {
          'Author': {
            S: 'William Shakespeare'
          },
          'Title': {
            S: 'The Tempest'
          },
          'Category': {
            S: 'Romantic Comedy'
          },
          'Formats': {
            M: {
              'Audiobook': {
                S: 'AWABZZ5G'
              }
            }
          }
        }
      }
    },
    {
      Update: {
        TableName: 'Books',
        Key: {
          'Author': {
            S: 'Dr. Seuss'
          },
          'Title': {
            S: 'Green Eggs and Ham'
          }
        },
        UpdateExpression: 'REMOVE #formats.#audiobook',
        ExpressionAttributeNames: {
          '#formats': 'Formats',
          '#audiobook': 'Audiobook'
        }
      }
    }
  ]
}, function (err, response) {
  if (err) return console.log(err);
  console.log(response);
});