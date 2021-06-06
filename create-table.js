const { dynamodb } = require('./dynamodb-client.js');

const util = require('util');

const run = async function () {
  try {
    var response = await dynamodb.createTable({
      TableName: 'Books',
      BillingMode: 'PAY_PER_REQUEST',
      AttributeDefinitions: [
        {
          AttributeName: 'Author',
          AttributeType: 'S'
        },
        {
          AttributeName: 'Title',
          AttributeType: 'S'
        },
        {
          AttributeName: 'Category',
          AttributeType: 'S'
        }
      ],
      KeySchema: [
        {
          AttributeName: 'Author',
          KeyType: 'HASH'
        },
        {
          AttributeName: 'Title',
          KeyType: 'RANGE'
        }
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: 'CategoryIndex',
          KeySchema: [
            {
              AttributeName: 'Category',
              KeyType: 'HASH'
            }
          ],
          Projection: {
            ProjectionType: 'ALL'
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