const { dynamodb } = require('./dynamodb-client.js');

const util = require('util');

const run = async function () {
  try {
    var response = await dynamodb.query({
      TableName: 'Books',
      IndexName: 'CategoryIndex',
      ProjectionExpression: undefined, //"Author, Title, Category, Formats",
      KeyConditionExpression:'#Cat = :category_name',
      ExpressionAttributeNames: {
        '#Cat': 'Category'
      },
      ExpressionAttributeValues: {
        ':category_name': {
          S: 'Suspense'
        }
      },
      Limit: undefined,
      ScanIndexForward: false // default true (asc)
    });
    console.log(util.inspect(response, false, null, true));
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};

run();