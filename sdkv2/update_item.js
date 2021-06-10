require('dotenv').config();

var AWS = require('aws-sdk');

var dynamodb = new AWS.DynamoDB({
  accessKeyId: process.env.API_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION
});

dynamodb.updateItem({
  TableName: 'Books',
  Key: {
    'Author': {
      S: process.argv[2]
    },
    'Title': {
      S: process.argv[3]
    }
  },
  UpdateExpression: 'SET #formats.#audiobook = :inventory_code',
  ExpressionAttributeNames: {
    '#formats': 'Formats',
    '#audiobook': 'Audiobook'
  },
  ExpressionAttributeValues: {
    ':inventory_code': {
      S: 'K5TVLWHV'
    }
  }
}, function (err, response) {
  if (err) return console.log(err);
  console.log(response);
});