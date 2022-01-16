import User from "../models/user.model";
import Service from "../models/service.model";
import { KoaHandler } from "../types";
import { ObjectId } from "mongodb";

export const getUsersController: KoaHandler = async (ctx, _next) => {
  try {
    const users = await ctx.state.mongoState.usersCollection.find({}).toArray();

    ctx.response.status = 200;
    ctx.response.body = users;
  } catch (error) {
    console.error(error);

    ctx.response.status = 500;
    ctx.response.body = `${error}`;
  }
};

export const getUserController: KoaHandler = async (ctx, _next) => {
  const id = ctx.params.id;
  try {
    const query = { _id: new ObjectId(id) };
    const user = await ctx.state.mongoState.usersCollection.findOne(query);

    if (!user) {
      throw new Error("no user found");
    }

    ctx.response.status = 200;
    ctx.response.body = user;
  } catch (error) {
    // console.log("here");

    // console.error(error);

    ctx.response.status = 500;
    ctx.response.body = `${error}`;
  }
};

export const createUserController: KoaHandler = async (ctx, _next) => {
  try {
  } catch (error) {}
};

export const emailUserPinController: KoaHandler = async (ctx, _next) => {
  try {
  } catch (error) {}
};

export const updateUserServiceController: KoaHandler = async (ctx, _next) => {
  try {
  } catch (error) {}
};

export const deleteUserController: KoaHandler = async (ctx, _next) => {
  try {
  } catch (error) {}
};

export const deleteUserByPinController: KoaHandler = async (ctx, _next) => {
  try {
  } catch (error) {}
};
