import { Hono } from 'hono'
import { poweredBy } from 'hono/powered-by'
import { setupApi } from './cms/api/api';

const app = new Hono()

app.use('*', poweredBy())

setupApi(app);


app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default app
