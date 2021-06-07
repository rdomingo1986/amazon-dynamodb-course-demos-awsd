const { dynamodb } = require('./dynamodb-client.js');

const util = require('util');

const run = async function () {
  try {
    var response = await dynamodb.query({
      TableName: 'Books',
      ProjectionExpression: undefined, //"Author, Title, Category, Formats",
      KeyConditionExpression:'Author = :author_name',
      ExpressionAttributeValues: {
        ':author_name': {
          S: process.argv[2] == undefined ? 'John Grisham' : process.argv[2]
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