import { handler } from '../src/handlers/appointmentHandler';

describe('Appointment Handler', () => {
  it('should return appointment details for valid appointmentId', async () => {
    const event = { appointmentId: 'valid-id' };
    const result = await handler(event);

    expect(result.statusCode).toBe(200);
    expect(result.body).toBeDefined();
  });

  it('should return error for invalid appointmentId', async () => {
    const event = { appointmentId: 'invalid-id' };
    const result = await handler(event);

    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body).message).toBe('Could not fetch appointment');
  });
});
