require('dotenv').config();

var AWS = require('aws-sdk');

var dynamodb = new AWS.DynamoDB({
  accessKeyId: process.env.API_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION
});

dynamodb.updateTable({
  TableName : "Books",
  AttributeDefinitions: [       
    { AttributeName: "Category", AttributeType: "S" }
  ],
  GlobalSecondaryIndexUpdates: [
    {
      Create: {
        IndexName: "CategoryIndex",
        KeySchema: [       
          { AttributeName: "Category", KeyType: "HASH"}
        ],
        Projection: {
          ProjectionType: "ALL"
        },
        ProvisionedThroughput: {       
          ReadCapacityUnits: 1, 
          WriteCapacityUnits: 1
        }
      }
    }
  ]
}, function (err, response) {
  if (err) return console.log(err);
  console.log(response);
});