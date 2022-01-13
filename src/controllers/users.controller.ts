import Koa from 'koa';
import Router from '@koa/router';
import { MyState } from '../main';
import User from '../models/user.model';
import Service from '../models/service.model';

export const getGame = async (
  ctx: Koa.ParameterizedContext<
    MyState,
    Koa.DefaultContext & Router.RouterParamContext<MyState, Koa.DefaultContext>,
    any
  >,
  next: Koa.Next
) => {
  try {
    const newUser: User = {
      name: 'John Doe',
      email: 'test@gmail.com',
      serviceDate: '1',
      serviceId: '1',
      seats: 0,
      updaterPin: 0,
    };

    const result = await ctx.state.mongoState.usersCollection.insertOne(
      newUser
    );
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
    const newService: Service = {
      date: 0,
      seats: 450,
    };

    const result = await ctx.state.mongoState.servicesCollection.insertOne(
      newService
    );
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
