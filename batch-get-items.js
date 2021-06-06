const { dynamodb } = require('./dynamodb-client.js');

const util = require('util');

const run = async function () {
  try {
    var response = await dynamodb.batchGetItem({
      RequestItems: {
        'Books': {
          Keys: [
            {
              'Author': {
                S: 'Dr. Seuss'
              },
              'Title': {
                S: 'Green Eggs and Ham'
              }
            },
            {
              'Author': {
                S: 'James Patterson'
              },
              'Title': {
                S: 'Along Came a Spider'
              }
            }
          ]
        }
      }
    });
    console.log(util.inspect(response, false, null, true));
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};

run();