const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.json());


app.post('/authenticate', (req, res) => {
  const { username } = req.body;
  res.status(200).json({ username });
});


const server = app.listen(3001, () => {
  console.log('Server up and running 😄');
});

describe('Authentication API', () => {
  afterAll(() => {

    server.close();
  });

  it('should create a new user with valid data', async () => {
    const username = 'zack'; 

    const response = await request(app)
      .post('/authenticate')
      .send({ username });

    expect(response.status).toBe(200);
    expect(response.body.username).toBe(username);
  });
});
