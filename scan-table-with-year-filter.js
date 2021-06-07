const { dynamodb } = require('./dynamodb-client.js');

const util = require('util');

const run = async function () {
  try {
    var response = await dynamodb.scan({
      TableName: 'Books',
      ProjectionExpression: undefined, //"Author, Title, Category, Formats"
      FilterExpression: '#Y between :slowValue and :highValue',
      ExpressionAttributeValues: {
        ":slowValue": {
          N: "1957"
        },
        ":highValue": {
          N: "1967"
        }
      },
      ExpressionAttributeNames: {
        "#Y": 'Year'
      }
    });
    console.log(util.inspect(response, false, null, true));
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};

run();