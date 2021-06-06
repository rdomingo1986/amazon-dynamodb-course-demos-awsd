const { dynamodb } = require('./dynamodb-client.js');

const util = require('util');

const run = async function (item) {
  var input = {
    TableName: 'Books',
    Key: {
      'Author': {
        S: 'John Grisham'
      },
      'Title': {
        S: 'The Rainmaker'
      }
    }
  };
  try {
    var response = await dynamodb.deleteItem(
      item === undefined ? input : item
    );
    console.log(util.inspect(response, false, null, true));
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};

run();

module.exports.runDeleteItem = (item) => run(item);