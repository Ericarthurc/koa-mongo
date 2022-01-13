import Router from '@koa/router';
import { getGame, getTest } from '../controllers/games.controller';
import { MyState } from '../main';

export const gameRouter = new Router<MyState>();
gameRouter.get('/', getGame).get('/test', getTest);
