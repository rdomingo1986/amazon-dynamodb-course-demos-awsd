const { dynamodb } = require('../dynamodb-client.js');

const util = require('util');

module.exports.ScanTable = async function () {
  try {
    return await dynamodb.scan({
      TableName: 'Books'
    });
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
};