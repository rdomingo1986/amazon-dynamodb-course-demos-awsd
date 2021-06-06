const { dynamodb } = require('./dynamodb-client.js');

const util = require('util');

const run = async function () {
  try {
    var response = await dynamodb.updateItem({
      TableName: 'Books',
      Key: {
        'Author': {
          S: 'John Grisham'
        },
        'Title': {
          S: 'The Rainmaker'
        }
      },
      UpdateExpression: 'REMOVE #formats.#audiobook',
      ExpressionAttributeNames: {
        '#formats': 'Formats',
        '#audiobook': 'Audiobook'
      }
    });
    console.log(util.inspect(response, false, null, true));
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};

run();