import Koa from 'koa';
import * as dotenv from 'dotenv';
import * as mongoDB from 'mongodb';

// local
import { connectToDatabase } from './services/database.service';
import User from './models/user.model';
import { usersRouter } from './router/router';
import Service from './models/service.model';

export interface MyState {
  mongoState: {
    mongoClient: mongoDB.MongoClient;
    usersCollection: mongoDB.Collection<User>;
    servicesCollection: mongoDB.Collection<Service>;
  };
}

(async function main() {
  dotenv.config();

  const PORT = process.env.PORT || 4000;

  const mongoState = await connectToDatabase();

  const app = new Koa<MyState>();

  app.use(async (ctx, next) => {
    ctx.state.mongoState = mongoState;
    await next();
  });

  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });

  app.use(usersRouter.routes()).use(usersRouter.allowedMethods());

  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
})();
