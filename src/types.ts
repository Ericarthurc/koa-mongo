import Koa from "koa";
import Router from "@koa/router";
import * as mongoDB from "mongodb";

import User from "./models/user.model";
import Service from "./models/service.model";

type AddParameters<
  TFunction extends (...args: any) => any,
  TParameters extends [...args: any]
> = (
  ...args: [...Parameters<TFunction>, ...TParameters]
) => ReturnType<TFunction>;

export interface MyKoaState {
  mongoState: {
    mongoClient: mongoDB.MongoClient;
    usersCollection: mongoDB.Collection<User>;
    servicesCollection: mongoDB.Collection<Service>;
  };
}

export type KoaHandler = (
  ctx: Koa.ParameterizedContext<
    MyKoaState,
    Koa.DefaultContext &
      Router.RouterParamContext<MyKoaState, Koa.DefaultContext>,
    any
  >,
  next: Koa.Next
) => Promise<void>;

export type KoaMiddleware = (
  ctx: Koa.ParameterizedContext<MyKoaState, Koa.DefaultContext, any>,
  next: Koa.Next
) => Promise<void>;
