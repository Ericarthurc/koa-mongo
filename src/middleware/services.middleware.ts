import { KoaMiddleware, MyKoaState } from "../types";

export const dbInjectorMiddleware = (
  mongoState: MyKoaState["mongoState"]
): KoaMiddleware => {
  return async (ctx, next) => {
    ctx.state.mongoState = mongoState;
    await next();
  };
};

export const httpStatsMiddleware: KoaMiddleware = async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} | ${ctx.status} | ${ctx.url} - ${ms}ms`);
};
