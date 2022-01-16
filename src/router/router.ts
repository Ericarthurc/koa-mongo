import Router from "@koa/router";
import {
  getUsersController,
  getUserController,
  createUserController,
  emailUserPinController,
  updateUserServiceController,
  deleteUserByPinController,
  deleteUserController,
} from "../controllers/users.controller";
import { MyKoaState } from "../types";
import Dotenv from "dotenv";

Dotenv.config();

export const usersRouter = new Router<MyKoaState>({
  prefix: `/api/v${process.env.API_VERSION}/users`,
});
usersRouter
  .get("/", getUsersController)
  .get("/:id", getUserController)
  .post("/", createUserController)
  .post("/requestpin", emailUserPinController)
  .patch("/udpateuser/:pin", updateUserServiceController)
  .delete("/deletebypin/:pin", deleteUserByPinController)
  .delete("/:id", deleteUserController);
