import Koa from 'koa';
import dotenv from 'dotenv';

// local
import { connectToDatabase } from './services/database.service';
import { usersRouter } from './router/router';
import { httpStatsMiddleware } from './middleware/stats';
import { MyKoaState } from './types';

(async function main() {
  dotenv.config();

  const PORT = process.env.PORT || 4000;

  const mongoState = await connectToDatabase();

  const app = new Koa<MyKoaState>();

  app.use(async (ctx, next) => {
    ctx.state.mongoState = mongoState;
    await next();
  });

  app.use(httpStatsMiddleware);

  app.use(usersRouter.routes()).use(usersRouter.allowedMethods());

  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
})();
