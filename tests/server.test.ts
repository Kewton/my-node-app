// Jestテストファイル
import request from 'supertest';
import { app, server } from '../src/server'; // serverもエクスポートする必要があります

afterAll(() => {
  server.close(); // サーバーをクローズする
});

describe('GET /', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });
});
