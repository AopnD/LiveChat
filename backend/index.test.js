const request = require('supertest');
const app = require('./index');
const axios = require('axios');

jest.mock('axios');

describe('POST /authenticate', () => {
  it('should respond with status 200 and success message on valid input', async () => {
    const username = 'testuser';
    const mockResponse = {
      status: 200,
      data: { success: true, message: 'Authentication successful' }
    };

    axios.put.mockResolvedValue(mockResponse);

    const response = await request(app)
      .post('/authenticate')
      .send({ username });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe('Authentication successful');
  });

  it('should respond with error status and message on axios error', async () => {
    const username = 'testuser';
    const mockError = {
      status: 404,
      data: { success: false, message: 'User not found' }
    };

    axios.put.mockRejectedValue(mockError);

    const response = await request(app)
      .post('/authenticate')
      .send({ username });

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('User not found');
  });
});
