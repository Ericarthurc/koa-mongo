import User from '../models/user.model';
import Service from '../models/service.model';
import { KoaHandler } from '../types';

export const getGame: KoaHandler = async (ctx, _next) => {
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
    console.log('handler finished!');
  } catch (error) {
    console.log('here');

    console.error(error);

    ctx.response.status = 500;
    ctx.response.body = error;
  }
};

export const getTest: KoaHandler = async (ctx, _next) => {
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
