const { dynamodb } = require('./dynamodb-client.js');

const util = require('util');

const run = async function () {
  try {
    var response = await dynamodb.query({
      TableName: 'Books',
      ProjectionExpression: undefined, //"Author, Title, Category, Formats",
      KeyConditionExpression:'Author = :author_name',
      FilterExpression: '#Y between :slowValue and :highValue',
      ExpressionAttributeValues: {
        ":author_name": {
          S: 'Dr. Seuss'
        },
        ":slowValue": {
          N: "1957"
        },
        ":highValue": {
          N: "1967"
        }
      },
      ExpressionAttributeNames: {
        "#Y": 'Year'
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