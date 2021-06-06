const { dynamodb } = require('./dynamodb-client.js');

const util = require('util');

const run = async function () {
  try {
    var response = await dynamodb.scan({
      TableName: 'Books',
      ProjectionExpression: undefined, //"Author, Title, Category, Formats"
      FilterExpression: "Category = :category_name",
      ExpressionAttributeValues: {
        ":category_name": {
          S: 'Suspense'
        }
      }
    });
    console.log(util.inspect(response, false, null, true));
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};

run();