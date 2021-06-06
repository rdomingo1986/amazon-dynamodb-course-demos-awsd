const { dynamodb } = require('../dynamodb-client.js');

const util = require('util');

module.exports.DeleteItem = async function (item) {
  try {
    return await dynamodb.deleteItem(item);
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};