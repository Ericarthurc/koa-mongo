import Router from '@koa/router';
import { getGame, getTest } from '../controllers/users.controller';
import { MyKoaState } from '../types';

export const usersRouter = new Router<MyKoaState>();
usersRouter
  .get('/', getGame)
  .get('/test', getTest)
  .get('/api', async (ctx, next) => {
    ctx.response.body = 'hello!';
  });
