import Koa from 'koa';
import Router from '@koa/router';
import { MyState } from '../main';
import Game from '../models/games.model';

export const getGame = async (
  ctx: Koa.ParameterizedContext<
    MyState,
    Koa.DefaultContext & Router.RouterParamContext<MyState, Koa.DefaultContext>,
    any
  >,
  next: Koa.Next
) => {
  try {
    const newGame: Game = {
      name: 'TacoBell Shooter',
      price: 1000,
      category: 'FPS',
    };

    const result = await ctx.state.gameCollection.insertOne(newGame);
    console.log(result);

    ctx.response.status = 200;
    ctx.response.body = result;
  } catch (error) {
    console.log('here');

    console.error(error);

    ctx.response.status = 500;
    ctx.response.body = error;
  }
};

export const getTest = async (
  ctx: Koa.ParameterizedContext<
    MyState,
    Koa.DefaultContext & Router.RouterParamContext<MyState, Koa.DefaultContext>,
    any
  >,
  next: Koa.Next
) => {
  try {
    const newGame: Game = {
      name: 'Plants Vs Zombies',
      price: 420,
      category: 'RPG',
    };

    const result = await ctx.state.gameCollection.insertOne(newGame);
    console.log(result);

    ctx.response.status = 200;
    ctx.response.body = result;
  } catch (error) {
    console.log('here');

    console.error(error);

    ctx.response.status = 500;
    ctx.response.body = error;
  }
};
