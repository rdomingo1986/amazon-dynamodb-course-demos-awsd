docker run -p 8000:8000 amazon/dynamodb-local

o

docker run -p 4566:4566 -p 4571:4571 localstack/localstack

aws dynamodb create-table --table-name localTable --attribute-definitions AttributeName=id,AttributeType=S --key-schema AttributeName=id,KeyType=HASH --billing-mode PAY_PER_REQUEST --endpoint=http://localhost:8000

aws dynamodb list-tables --endpoint=http://localhost:8000 