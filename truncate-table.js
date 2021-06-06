const { runScanTable } = require('./scan-table.js');

const { runDeleteItem } = require('./delete-item.js');

const util = require('util');

const run = async function () {
  try { //*
    var response = await runScanTable();
    response.Items.forEach(function (item) {
      (async function () {
        await runDeleteItem({
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