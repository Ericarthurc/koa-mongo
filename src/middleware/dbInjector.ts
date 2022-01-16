import { KoaMiddleware, MyKoaState } from "../types";

export const dbInjectorMiddleware = (
  mongoState: MyKoaState["mongoState"]
): KoaMiddleware => {
  return async (ctx, next) => {
    ctx.state.mongoState = mongoState;
    await next();
  };
};
