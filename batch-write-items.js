const { dynamodb } = require('./dynamodb-client.js');

const util = require('util');

var fs = require('fs');

console.log('Please wait...');

var booksFile = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));

var Items = [];

booksFile.forEach(function (book) {
  var item = {
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
    },
    'Year': {
      N: book.Year
    }
  };
  if(process.argv[2].includes('full')) {
    item.Image = { S: book.Image };
    item.Image2 = { S: book.Image2 };
  }
  Items.push({
    PutRequest: {
      Item: item
    }
  });
});

const run = async function () {
  try {
    var response = await dynamodb.batchWriteItem({
      RequestItems: {
        'Books': Items
      }
    });
    console.log(util.inspect(response, false, null, true));
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};

run();