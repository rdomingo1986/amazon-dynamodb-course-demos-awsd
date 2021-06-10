require('dotenv').config();

var AWS = require('aws-sdk');

var dynamodb = new AWS.DynamoDB({
  accessKeyId: process.env.API_KEY,
  secretAccessKey: process.env.SECRET_KEY,
  region: process.env.REGION
});

dynamodb.createTable({
  TableName : "Books",
  KeySchema: [       
      { AttributeName: "Author", KeyType: "HASH"},
      { AttributeName: "Title", KeyType: "RANGE" }
  ],
  AttributeDefinitions: [       
      { AttributeName: "Author", AttributeType: "S" },
      { AttributeName: "Title", AttributeType: "S" }
  ],
  ProvisionedThroughput: {       
      ReadCapacityUnits: 1, 
      WriteCapacityUnits: 1
  }
}, function (err, response) {
  if (err) return console.log(err);
  console.log(response);
});