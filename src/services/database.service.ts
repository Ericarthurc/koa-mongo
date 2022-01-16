import * as mongoDB from "mongodb";
import Chalk from "chalk";

import User from "../models/user.model";
import Service from "../models/service.model";

const collectionCreator = async <T>(
  mongoDb: mongoDB.Db,
  mongoCollectionList: Pick<mongoDB.CollectionInfo, "name" | "type">[],
  collectionNameENV: string,
  collectionOptions?: mongoDB.CreateCollectionOptions | undefined
): Promise<mongoDB.Collection<T>> => {
  let collection: mongoDB.Collection<T>;
  if (
    mongoCollectionList.find(
      (collection) => collection.name == collectionNameENV
    )
  ) {
    collection = mongoDb.collection<T>(collectionNameENV);
    console.log(Chalk.blueBright(`[${collectionNameENV}] collection found!`));
  } else {
    collection = await mongoDb.createCollection<T>(
      collectionNameENV,
      collectionOptions
    );
    console.log(Chalk.greenBright(`Creating ${collectionNameENV} collection!`));
  }

  return collection;
};

export const connectToDatabase = async (): Promise<{
  mongoClient: mongoDB.MongoClient;
  usersCollection: mongoDB.Collection<User>;
  servicesCollection: mongoDB.Collection<Service>;
}> => {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.MONGO_URI || process.exit(1)
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.MONGO_DB_NAME);

  const collectionList = await db
    .listCollections({}, { nameOnly: true })
    .toArray();

  const servicesCollection = await collectionCreator<Service>(
    db,
    collectionList,
    <string>process.env.SERVICES_COLLECTION_NAME,
    {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["date", "seats"],
          additionalProperties: false,
          properties: {
            _id: {},
            date: {
              bsonType: "string",
              description: "'date' is required and is a string",
            },
            seats: {
              bsonType: "number",
              minimum: 0,
              maximum: 10,
              description: "'seats' is required and is a number",
            },
          },
        },
      },
    }
  );

  const usersCollection = await collectionCreator<User>(
    db,
    collectionList,
    <string>process.env.USERS_COLLECTION_NAME
  );

  console.log(
    Chalk.yellowBright.underline.bold(
      `Successfully connected to database: ${db.databaseName} and collections: ${usersCollection.collectionName}, ${servicesCollection.collectionName}`
    )
  );

  return { mongoClient: client, usersCollection, servicesCollection };
};
