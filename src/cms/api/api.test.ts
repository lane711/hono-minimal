import app from '../../index'

describe('Test the application', () => {
  it('Should return 200 response', async () => {
    const res = await app.request('http://0.0.0.0:8787/api/test')
    expect(res.status).toBe(200)
  })
})

// import { app } from './api'

// import app from '../../index'

// import { Hono } from "hono";
// import { setupApi } from './api'

// const app = new Hono();



// setupApi(app);

// describe('API Tests', () => {
//     test('GET forms', async () => {
//       const res = await app.request('http://127.0.0.1:3077/api/test');
//       expect(res.status).toBe(200)
//       expect(await res.text()).toBe('Many posts')
//     })
//   })