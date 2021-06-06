const { dynamodb } = require('./dynamodb-client.js');

const util = require('util');

const run = async function () {
  try {
    var response = await dynamodb.transactGetItems({
      TransactItems: [
        {
          Get: {
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
          Get: {
            TableName: 'Books',
            Key: {
              'Author': {
                S: 'Dr. Seuss'
              },
              'Title': {
                S: 'Green Eggs and Ham'
              }
            }
          }
        }
      ]
    });
    console.log(util.inspect(response, false, null, true));
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};

run();