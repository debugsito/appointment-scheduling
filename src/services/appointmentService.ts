import { dynamoDb, APPOINTMENT_TABLE_NAME } from '../config';
import { Appointment } from '../models/appointmentModel';

export const getAppointmentById = async (appointmentId: string): Promise<Appointment | null> => {
  
  if (!APPOINTMENT_TABLE_NAME) {
    throw new Error('La tabla de citas no está definida en la configuración.');
  }

  const params = {
    TableName: APPOINTMENT_TABLE_NAME,
    Key: { id: appointmentId },
  };

  try {
    const result = await dynamoDb.get(params).promise();
    return result.Item as Appointment | null;
  } catch (error) {
    console.error('Error fetching appointment:', error);
    throw new Error('No se pudo obtener la cita.');
  }
};
