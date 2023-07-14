const request = require('supertest');
const mongoose = require('mongoose');

const server = require('../../server');
const app = require('../../app');
const { User } = require('../../models/user');

const normalTestData = {
  email: 'melnykmyron1808@gmail.com',
  password: 'd2Ud4@$dwR',
};

const notVerifiedTestData = {
  email: 'melnykmyron18082@gmail.com',
  password: 'd2Ud4@$dwR',
};

describe('POST /api/users/login', () => {
  /**
   * Reset jwt token after each test
   */
  afterEach(async () => {
    const filter = { email: { $in: [normalTestData.email, notVerifiedTestData.email] } };
    const update = { $set: { token: '' } };
    await User.updateMany(filter, update);
  });

  /**
   * Disconection from mongoose and express after tests
   */
  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  /**
   * Missed email
   */
  it('should return "Required email" error - 1', async () => {
    const { email, ...testData } = normalTestData;
    const res = await request(app).post('/api/users/login').send(testData);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('missing required email field');
  });

  /**
   * Empty email
   */
  it('should return "Empty email" error - 2', async () => {
    const testData = { ...normalTestData, email: '' };
    const res = await request(app).post('/api/users/login').send(testData);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('email cannot be empty');
  });

  /**
   * Invalid email
   */
  it('should return "Invalid email" error - 3', async () => {
    const testData = { ...normalTestData, email: 'abc.mail' };
    const res = await request(app).post('/api/users/login').send(testData);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('invalid email');
  });

  /**
   * Missed password
   */
  it('should return "Required password" error - 4', async () => {
    const { password, ...testData } = normalTestData;
    const res = await request(app).post('/api/users/login').send(testData);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('missing required password field');
  });

  /**
   * Empty password
   */
  it('should return "Empty password" error - 5', async () => {
    const testData = { ...normalTestData, password: '' };
    const res = await request(app).post('/api/users/login').send(testData);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('password cannot be empty');
  });

  /**
   * Invalid password
   */
  it('should return "Invalid password" error - 6', async () => {
    const testData = { ...normalTestData, password: '1111dd' };
    const res = await request(app).post('/api/users/login').send(testData);
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('invalid password');
  });

  /**
   * Wrong password
   */
  it('should return "Email or password is wrong" error - 7', async () => {
    const testData = { ...normalTestData, password: 'd3Kd4@$dwRNN' };
    const res = await request(app).post('/api/users/login').send(testData);
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Email or password is wrong');
  });

  /**
   * Double login
   */
  it('should return "Logout" error - 8', async () => {
    const testData = { ...normalTestData };
    const _ = await request(app).post('/api/users/login').send(testData);
    const secondRes = await request(app).post('/api/users/login').send(testData);
    expect(secondRes.statusCode).toBe(409);
    expect(secondRes.body.message).toEqual('Logout first');
  });

  /**
   * Email not verified
   */
  it('should return "Email not verified" error - 9', async () => {
    const testData = { ...notVerifiedTestData };
    const res = await request(app).post('/api/users/login').send(testData);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Email not verified');
  });

  /**
   * Everything is good
   */
  it('should return token and user - 10', async () => {
    const testData = { ...normalTestData };
    const res = await request(app).post('/api/users/login').send(testData);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.any(Object),
      })
    );
  });
});
