require('dotenv').config();

var AWS = require('aws-sdk');
var fs = require('fs');

var dynamodb = new AWS.DynamoDB({
  accessKeyId: process.env.API_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.region
});

console.log('Please wait...');

var booksFile = JSON.parse(fs.readFileSync('books.json', 'utf8'));

var Items = [];

booksFile.forEach(function (book) {
  Items.push({
    PutRequest: {
      Item: {
        'Author': {
          S: book.Author
        },
        'Title': {
          S: book.Title
        },
        'Category': {
          S: book.Category
        },
        'Formats': {
          M: book.Formats
        }
      }
    }
  });
});

dynamodb.batchWriteItem({
  RequestItems: {
    'Books': Items
  }
}, function (err, response) {
  if (err) return console.log(err);
  console.log(response);
});