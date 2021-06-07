const { ScanTable } = require('./modules/scan-table-module.js');

const { DeleteItem } = require('./modules/delete-item-module.js');

const util = require('util');

const run = async function () {
  try { //*
    var response = await ScanTable();
    response.Items.forEach(function (item) {
      (async function () {
        await DeleteItem({
          TableName: 'Books',
          Key: {
            'Author': {
              S: item.Author.S
            },
            'Title': {
              S: item.Title.S
            }
          }
        });
      })();
    });
  } catch (err) {
    console.log(util.inspect(err, false, null, true));
  }
}

run();