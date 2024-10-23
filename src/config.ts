import { DynamoDB } from 'aws-sdk';

const { APPOINTMENT_TABLE_NAME, AWS_REGION } = process.env;

if (!APPOINTMENT_TABLE_NAME) {
  throw new Error('Falta la variable de entorno: APPOINTMENT_TABLE_NAME');
}

if (!AWS_REGION) {
  throw new Error('Falta la variable de entorno: AWS_REGION');
}

const dynamoDb = new DynamoDB.DocumentClient({
  region: AWS_REGION,
});

export { dynamoDb, APPOINTMENT_TABLE_NAME };
