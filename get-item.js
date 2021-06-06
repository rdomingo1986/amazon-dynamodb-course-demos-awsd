const { dynamodb } = require('./dynamodb-client.js');

const util = require('util');

const run = async function () {
  try {
    var response = await dynamodb.getItem({
      TableName: 'Books',
      Key: {
        'Author': {
          S: 'John Grisham'
        },
        'Title': {
          S: 'The Rainmaker'
        }
      },
      ProjectionExpression: undefined, //"Author, Title, Category, Formats"
      ConsistentRead: true // default false
    });
    console.log(util.inspect(response, false, null, true));
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};

run();