import { KoaMiddleware } from '../types';

export const httpStatsMiddleware: KoaMiddleware = async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
};
