// packages
import Koa from "koa";
import Dotenv from "dotenv";
import Chalk from "chalk";

// local
import { connectToDatabase } from "./services/database.service";
import { usersRouter } from "./router/router";
import {
  httpStatsMiddleware,
  dbInjectorMiddleware,
} from "./middleware/services.middleware";
import { MyKoaState } from "./types";

(async function main() {
  Dotenv.config();

  const mongoState = await connectToDatabase();

  const app = new Koa<MyKoaState>();

  app.use(dbInjectorMiddleware(mongoState));

  app.use(httpStatsMiddleware);

  app.use(usersRouter.routes()).use(usersRouter.allowedMethods());

  app.listen(process.env.PORT, () =>
    console.log(
      Chalk.cyanBright.underline.bold(
        `Server running on port: ${Chalk.greenBright(
          process.env.PORT
        )}\n${Chalk.magentaBright(
          `API Version: ${Chalk.greenBright(process.env.API_VERSION)}`
        )}`
      )
    )
  );
})();
