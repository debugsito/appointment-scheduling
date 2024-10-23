import { APPOINTMENT_TABLE_NAME, dynamoDb } from '../config';

export const handler = async (event: any) => {
  
  const { appointmentId }: { appointmentId: string } = event;

  if (!APPOINTMENT_TABLE_NAME) {
    console.error('La tabla de citas no está definida en la configuración.');
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'La tabla de citas no está definida.' }),
    };
  }

  const params = {
    TableName: APPOINTMENT_TABLE_NAME,
    Key: { id: appointmentId },
  };

  try {
    const result = await dynamoDb.get(params).promise();
    
    if (!result.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Appointment not found' }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
  } catch (error) {
    console.error('Error fetching appointment:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Could not fetch appointment' }),
    };
  }
};
