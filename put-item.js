const { dynamodb } = require('./dynamodb-client.js');

const util = require('util');

const run = async function () {
  try {
    var response = await dynamodb.putItem({
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
    });
    console.log(util.inspect(response, false, null, true));
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};

run();