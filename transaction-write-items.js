const { dynamodb } = require('./dynamodb-client.js');

const util = require('util');

const run = async function () {
  try {
    var response = await dynamodb.transactWriteItems({
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
    });
    console.log(util.inspect(response, false, null, true));
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};

run();