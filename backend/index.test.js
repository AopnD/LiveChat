const request = require('supertest');
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Route for testing
app.post('/authenticate', (req, res) => {
  const { username } = req.body;
  res.status(200).json({ username });
});

// Start the server before running tests
const server = app.listen(3001, () => {
  console.log('Server up and running 😄');
});

// Define test cases
describe('Authentication API', () => {
  afterAll(() => {
    // Close the server after all tests are done
    server.close();
  });

  it('should create a new user with valid data', async () => {
    const username = 'zack'; // Replace with the username you want to test

    const response = await request(app)
      .post('/authenticate')
      .send({ username });

    expect(response.status).toBe(200);
    expect(response.body.username).toBe(username);
  });
});
