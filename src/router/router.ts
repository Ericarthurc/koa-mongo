import Router from '@koa/router';
import { getGame, getTest } from '../controllers/users.controller';
import { MyState } from '../main';

export const usersRouter = new Router<MyState>();
usersRouter.get('/', getGame).get('/test', getTest);
