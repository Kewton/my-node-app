import request from 'supertest';
import app from '../src/server';

describe('GET /', () => {
it('should return 200 OK', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
});
});