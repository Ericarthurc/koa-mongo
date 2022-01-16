import Router from "@koa/router";
import { getGame, getTest } from "../controllers/users.controller";
import { MyKoaState } from "../types";
import Dotenv from "dotenv";

Dotenv.config();

export const usersRouter = new Router<MyKoaState>({
  prefix: `/api/v${process.env.API_VERSION}/`,
});
usersRouter
  .get("/", getGame)
  .get("/test", getTest)
  .get("/api", async (ctx, next) => {
    ctx.response.body = "hello!";
  });
