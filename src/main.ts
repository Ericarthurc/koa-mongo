import Koa from 'koa';
import { connectToDatabase } from './services/database.service';
import * as dotenv from 'dotenv';

(async function main() {
  dotenv.config();
  await connectToDatabase();

  const app = new Koa();

  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });

  app.listen(4000, () => console.log(`Server running on port: ${4000}`));
})();
