import Koa from 'koa';
import Router from '@koa/router';
import * as dotenv from 'dotenv';
import * as mongoDB from 'mongodb';

// local
import { connectToDatabase } from './services/database.service';
import Game from './models/games.model';
import { gameRouter } from './router/router';

export interface MyState {
  gameCollection: mongoDB.Collection<Game>;
}

(async function main() {
  dotenv.config();

  const PORT = process.env.PORT || 4000;

  const gameCollection = await connectToDatabase();

  const app = new Koa<MyState>();

  app.use(async (ctx, next) => {
    ctx.state.gameCollection = gameCollection;
    await next();
  });

  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });

  app.use(gameRouter.routes()).use(gameRouter.allowedMethods());

  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
})();
