require('dotenv').config();

var AWS = require('aws-sdk');

var dynamodb = new AWS.DynamoDB({
  accessKeyId: process.env.API_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION
});

dynamodb.deleteItem({
  TableName: 'Books',
  Key: {
    'Author': {
      S: process.argv[2]
    },
    'Title': {
      S: process.argv[3]
    }
  }
}, function (err, response) {
  if (err) return console.log(err);
  console.log(response);
});