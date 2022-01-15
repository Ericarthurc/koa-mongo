import Koa from 'koa';
import { MyKoaState } from '../types';

export async function httpStatsMiddleware(
  ctx: Koa.ParameterizedContext<MyKoaState, Koa.DefaultContext, any>,
  next: Koa.Next
) {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
}
